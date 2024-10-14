import { Repository } from 'typeorm';
import { Satisfaction } from '../entity/Satisfaction';

export interface SatisfactionRepository extends Repository<Satisfaction> {
  findSatisfactionByChallengeId(challengeId: number): Promise<Satisfaction[]>;
}
