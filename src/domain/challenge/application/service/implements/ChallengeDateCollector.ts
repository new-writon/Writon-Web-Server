import { Injectable } from '@nestjs/common';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeOperation } from '../types/Operation';
import { ChallengeDayHelper } from '../../helper/ChallengeDay.Helper';
import { ChallengeDay } from 'src/domain/challenge/domain/entity/ChallengeDay';

@Injectable()
export class ChallengeDateCollector implements ChallengeUseCase<[number], Promise<string[]>> {
  operation: ChallengeOperation = 'SELECT_CHALLENGE_DATE';
  constructor(private readonly challengeDayHelper: ChallengeDayHelper) {}
  async handle(request: [number]): Promise<string[]> {
    const [challengeId] = request;
    const challengeDay = await this.challengeDayHelper.giveChallengeDayByChallengeId(challengeId);
    const challengeDays = this.sortChallnegeDay(challengeDay);
    return challengeDays;
  }

  private sortChallnegeDay(challengeDay: ChallengeDay[]) {
    return challengeDay
      .filter((data) => new Date(data.getDay()) < new Date())
      .map((data) => data.getDay());
  }
}
