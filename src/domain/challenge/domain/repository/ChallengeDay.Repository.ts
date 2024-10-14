import { Repository } from 'typeorm';
import { ChallengeDay } from '../entity/ChallengeDay';

export interface ChallengeDayRepository extends Repository<ChallengeDay> {
  findChallengeDayByChallengeIdAndDate(
    challengeId: number,
    date: string,
  ): Promise<ChallengeDay>;

  findChallengeOverlapCount(challengeId: number): Promise<number>;

  findChallengeDayByChallengeId(challengeId: number): Promise<ChallengeDay[]>;
}
