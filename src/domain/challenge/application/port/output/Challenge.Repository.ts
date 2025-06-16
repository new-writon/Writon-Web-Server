import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { ChallengeAllInformation } from 'src/domain/challenge/dto/values/ChallengeAllInformation';
import { ChallengeInformation } from 'src/domain/challenge/dto/values/ChallengeInformation';
import { ChallengesPerOrganization } from 'src/domain/user/dto/values/ChallengesPerOrganization';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';
import { Repository } from 'typeorm';

export interface ChallengeRepository extends Repository<Challenge> {
  findByStatus(status: ChallengeStatusEnum, date: string): Promise<Challenge>;
  findChallengeByIdAndOngoing(challengeId: number): Promise<Challenge[]>;

  findOverlapPeriod(challengeId: number): Promise<number>;

  findChallengeById(challengeId: number): Promise<Challenge>;

  findChallengeWithCondition(challengeId: number): Promise<ChallengeInformation[]>;

  findChallengeByChallengeName(challenge: string): Promise<Challenge>;

  findChallengeByOrgnizationIds(organizationIds: number[]): Promise<Challenge[]>;

  findAllChallengingInformation(): Promise<ChallengeAllInformation[]>;
  findChallengesByIds(challengeIds: number[]): Promise<ChallengesPerOrganization[]>;
}
