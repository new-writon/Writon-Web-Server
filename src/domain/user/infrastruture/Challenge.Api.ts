import { Injectable } from '@nestjs/common';
import { ChallengeDay } from '../../../domain/challenge/domain/entity/ChallengeDay';
import { ChallengeHelper } from 'src/domain/challenge/application/helper/Challenge.Helper';
import { ChallengeDayHelper } from 'src/domain/challenge/application/helper/ChallengeDay.Helper';

@Injectable()
export class ChallengeApi {
  constructor(
    private readonly challengeHelper: ChallengeHelper,
    private readonly challengeDayHelper: ChallengeDayHelper,
  ) {}

  public async requestChallengeById(challengeId: number) {
    return this.challengeHelper.giveChallengeById(challengeId);
  }

  public async requestChallengeWithCondition(challengeId: number) {
    return this.challengeHelper.giveChallengeWithCondition(challengeId);
  }

  public async requestOverlapPeriod(challengeId: number): Promise<number> {
    return this.challengeHelper.giveOverlapPeriod(challengeId);
  }

  public async requestChallengeOverlapCount(challengeId: number): Promise<number> {
    // 검증 x
    return this.challengeDayHelper.giveChallengeOverlapCount(challengeId);
  }

  public async requestChallengeDayByChallengeId(challengeId: number): Promise<ChallengeDay[]> {
    return this.challengeDayHelper.giveChallengeDayByChallengeId(challengeId);
  }

  public async requestAllChallengingInformation(): Promise<ChallengeAllInformation[]> {
    return this.challengeHelper.giveAllChallengingInformation();
  }

  public async requestChallengesByIds(challengeIds: number[]) {
    return this.challengeHelper.giveChallengesByIds(challengeIds);
  }
}
