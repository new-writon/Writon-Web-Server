import { Injectable } from '@nestjs/common';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeOperation } from '../types/Operation';
import { ChallengeDayHelper } from '../../helper/ChallengeDay.Helper';
import { ChallengeVerifyService } from 'src/global/exception/challenge/ChallengeVerify.Service';

@Injectable()
export class ChallengeDateChecker implements ChallengeUseCase<[number, string], Promise<void>> {
  operation: ChallengeOperation = 'CHECK_CHALLENGE_DAY';
  constructor(
    private readonly challengeDayHelper: ChallengeDayHelper,
    private readonly challengeVerifyService: ChallengeVerifyService,
  ) {}
  async handle(request: [number, string]): Promise<void> {
    const [challengeId, date] = request;
    const challengeDayData = await this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(
      challengeId,
      date,
    );
    this.challengeVerifyService.verifyChallengeDay(challengeDayData);
  }
}
