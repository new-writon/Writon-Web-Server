import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChallengeRegistrant } from 'src/domain/challenge/application/service/implements/ChallengeRegistrant';
import { CreateChallenge } from 'src/domain/challenge/dto/request/CreateChallenge';
import { Transactional } from 'typeorm-transactional';
import { ChallengeStatusEnum } from '../enum/ChallengeStatus';
import { ChallengeDayRegistrant } from 'src/domain/challenge/application/service/implements/ChallengeDayRegistrant';

import { CreateChallengeDay } from 'src/domain/challenge/dto/request/CreateChallengeDay';
import { DateHelper } from './DateHelper';
import { AffiliationHelper } from 'src/domain/user/helper/Affiliation.Helper';
import { OrganizationEnum } from '../enum/Organization';
import { UserChallengeHelper } from 'src/domain/user/helper/UserChallenge.Helper';

@Injectable()
export class ChallengeScheduler {
  constructor(
    private readonly challengeRegistrant: ChallengeRegistrant,
    private readonly challengeDayRegistrant: ChallengeDayRegistrant,
    private readonly affiliationHelper: AffiliationHelper,
    private readonly userChallengeHelper: UserChallengeHelper,
  ) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  //@Cron(CronExpression.EVERY_MINUTE)
  @Transactional()
  async handleMonthlyChallenge() {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const name = `${year}/${(month + 1).toString().padStart(2, '0')}`;
      const startAt = new Date(year, month, 1);
      const endAt = new Date(year, month + 1, 0, 23, 59, 59, 999);
      const challenge = CreateChallenge.of({
        name: name,
        startAt: startAt,
        endAt: endAt,
        organizationId: 5,
        deposit: 0,
        status: ChallengeStatusEnum.WRITON,
      });
      const result = await this.challengeRegistrant.handle(challenge);
      const allDates = DateHelper.getAllDatesInCurrentMonth();
      const challengeDays = allDates.map((date) =>
        CreateChallengeDay.of({ day: date, challengeId: result.getId() }),
      );
      await this.challengeDayRegistrant.handle(challengeDays);
      const affiliations = await this.affiliationHelper.giveAffiliationByOrganization(
        OrganizationEnum.WRITON,
      );
      affiliations.map((affiliation) =>
        this.userChallengeHelper.executeInsertWritonerChallenge(affiliation),
      );
      console.log('월별 챌린지 처리 완료');
    } catch (error) {
      console.error('스케줄러 실행 에러', error);
    }
  }
}
