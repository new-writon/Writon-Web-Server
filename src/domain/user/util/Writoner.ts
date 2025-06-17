import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';
import { getKoreanYYYYMM } from 'src/global/util/date';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { ChallengeApi } from '../infrastruture/Challenge.Api';
import { UserChallengeHelper } from '../helper/UserChallenge.Helper';

@Injectable()
export class Writoner {
  constructor(
    private readonly challengeApi: ChallengeApi,
    @Inject(forwardRef(() => UserChallengeHelper))
    private readonly userChallengeHelper: UserChallengeHelper,
  ) {}
  async execute(affiliation: Affiliation) {
    // status가 WRITON인 데이터를 가져옴.
    console.log(affiliation, getKoreanYYYYMM());
    const challenge = await this.challengeApi.requestChallengeByStatus(
      ChallengeStatusEnum.WRITON,
      getKoreanYYYYMM(),
    );
    console.log(challenge);
    //  유저 챌린가 있는지 확인
    const userChallenge =
      await this.userChallengeHelper.giveUserChallengeByAffiliationIdAndChallengeId(
        affiliation.getId(),
        challenge.getId(),
      );
    return (
      userChallenge ??
      this.userChallengeHelper.executeInsertUserChallenge(
        affiliation.getId(),
        challenge.getId(),
        0,
        0,
      )
    );
  }
}
