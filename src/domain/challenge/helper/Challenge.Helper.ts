import { Inject, Injectable } from '@nestjs/common';
import { ChallengeRepository } from '../domain/repository/Challenge.Repository';
import { Challenge } from '../domain/entity/Challenge';
import { ChallengeInformation } from '../dto/values/ChallengeInformation';

@Injectable()
export class ChallengeHelper {
  constructor(
    @Inject('challengeImpl')
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  public async giveOverlapPeriod(challengeId: number): Promise<number> {
    return this.challengeRepository.findOverlapPeriod(challengeId);
  }

  public async giveChallengeById(challengeId: number): Promise<Challenge> {
    return this.challengeRepository.findChallengeById(challengeId);
  }

  public async giveChallengeWithCondition(
    challengeId: number,
  ): Promise<ChallengeInformation[]> {
    return this.challengeRepository.findChallengeWithCondition(challengeId);
  }

  public async giveChallengeByIdAndOngoing(
    challengeId: number,
  ): Promise<Challenge[]> {
    return this.challengeRepository.findChallengeByIdAndOngoing(challengeId);
  }

  public async giveChallengeByChallengeName(
    challenge: string,
  ): Promise<Challenge> {
    return this.challengeRepository.findChallengeByChallengeName(challenge);
  }

  public async giveChallengeByOrgnizationIds(
    organizationIds: number[],
  ): Promise<Challenge[]> {
    return this.challengeRepository.findChallengeByOrgnizationIds(
      organizationIds,
    );
  }

  public async giveAllChallengingInformation(): Promise<
    ChallengeAllInformation[]
  > {
    return this.challengeRepository.findAllChallengingInformation();
  }

  public async giveChallengesByIds(challengeIds: number[]) {
    return this.challengeRepository.findChallengesByIds(challengeIds);
  }
}
