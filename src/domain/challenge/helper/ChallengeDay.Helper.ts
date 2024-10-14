import { Inject, Injectable } from '@nestjs/common';
import { ChallengeDayRepository } from '../domain/repository/ChallengeDay.Repository';
import { ChallengeDay } from '../domain/entity/ChallengeDay';
import { ChallengeVerifyService } from '../../../global/exception/challenge/ChallengeVerify.Service';

@Injectable()
export class ChallengeDayHelper {
  constructor(
    @Inject('challengedayImpl')
    private readonly challengeDayRepository: ChallengeDayRepository,
    private readonly challengeVerifyService: ChallengeVerifyService,
  ) {}

  public async giveChallengeOverlapCount(challengeId: number): Promise<number> {
    return this.challengeDayRepository.findChallengeOverlapCount(challengeId);
  }

  public async giveChallengeDayByChallengeId(
    challengeId: number,
  ): Promise<ChallengeDay[]> {
    return this.challengeDayRepository.findChallengeDayByChallengeId(
      challengeId,
    );
  }

  public async giveChallengeDayByChallengeIdAndDate(
    challengeId: number,
    date: string,
  ): Promise<ChallengeDay> {
    return this.challengeDayRepository.findChallengeDayByChallengeIdAndDate(
      challengeId,
      date,
    );
  }
}
