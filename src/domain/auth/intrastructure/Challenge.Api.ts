import { Injectable } from '@nestjs/common';
import { ChallengeHelper } from 'src/domain/challenge/application/helper/Challenge.Helper';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

@Injectable()
export class ChallengeApi {
  constructor(private readonly challengeHelper: ChallengeHelper) {}

  public async requestChallengeByStatus(status: ChallengeStatusEnum, date: string) {
    return this.challengeHelper.giveByStatus(status, date);
  }
}
