import { Repository } from 'typeorm';
import { Challenge } from '../entity/Challenge';
import { ChallengeInformation } from '../../dto/values/ChallengeInformation';
import { ChallengesPerOrganization } from '../../../user/dto/values/ChallengesPerOrganization';

export interface ChallengeRepository extends Repository<Challenge> {
  findChallengeByIdAndOngoing(challengeId: number): Promise<Challenge[]>;

  findOverlapPeriod(challengeId: number): Promise<number>;

  findChallengeById(challengeId: number): Promise<Challenge>;

  findChallengeWithCondition(
    challengeId: number,
  ): Promise<ChallengeInformation[]>;

  findChallengeByChallengeName(challenge: string): Promise<Challenge>;

  findChallengeByOrgnizationIds(
    organizationIds: number[],
  ): Promise<Challenge[]>;

  findAllChallengingInformation(): Promise<ChallengeAllInformation[]>;
  findChallengesByIds(
    challengeIds: number[],
  ): Promise<ChallengesPerOrganization[]>;
}
