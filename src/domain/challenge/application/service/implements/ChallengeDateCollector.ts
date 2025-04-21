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
    console.log(challengeDay);
    const challengeDays = this.sortChallnegeDay(challengeDay);
    // console.log(challengeDays);
    return challengeDays;
  }

  private sortChallnegeDay(challengeDay: ChallengeDay[]) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    console.log(todayStr);
    return challengeDay.filter((data) => data.getDay() <= todayStr).map((data) => data.getDay());
  }
}
