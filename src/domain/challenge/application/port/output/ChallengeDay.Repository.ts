import { ChallengeDay } from 'src/domain/challenge/domain/entity/ChallengeDay';
import { Repository } from 'typeorm';

export interface ChallengeDayRepository extends Repository<ChallengeDay> {
  findChallengeDayByChallengeIdAndDate(challengeId: number, date: string): Promise<ChallengeDay>;

  findChallengeOverlapCount(challengeId: number): Promise<number>;

  findChallengeDayByChallengeId(challengeId: number): Promise<ChallengeDay[]>;
}
