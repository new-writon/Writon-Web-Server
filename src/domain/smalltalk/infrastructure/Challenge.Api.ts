import { Injectable } from '@nestjs/common';
import { ChallengeHelper } from 'src/domain/challenge/application/helper/Challenge.Helper';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
@Injectable()
export class ChallengeApi {
  constructor(private readonly challengeHelper: ChallengeHelper) {}

  public async requestChallengeById(challengeId: number): Promise<Challenge> {
    return this.challengeHelper.giveChallengeById(challengeId);
  }
}
