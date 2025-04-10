import { Injectable } from '@nestjs/common';
import { Challenge } from '../../challenge/domain/entity/Challenge';
import { ChallengeHelper } from 'src/domain/challenge/application/helper/Challenge.Helper';
import { ChallengeDayHelper } from 'src/domain/challenge/application/helper/ChallengeDay.Helper';

@Injectable()
export class ChallengeApi {
  constructor(
    private readonly challengeHelper: ChallengeHelper,
    private readonly challengeDayHelper: ChallengeDayHelper,
  ) {}

  public async requestChallengeById(challengeId: number): Promise<Challenge> {
    return this.challengeHelper.giveChallengeById(challengeId);
  }

  public async requestChallengeOverlapCount(challengeId: number): Promise<number> {
    return this.challengeDayHelper.giveChallengeOverlapCount(challengeId);
  }
}
