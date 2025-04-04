import { Injectable } from '@nestjs/common';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeStatus } from 'src/domain/challenge/dto/response/ChallengeStatus';
import { ChallengeOperation } from '../types/Operation';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { ChallengeHelper } from '../../helper/Challenge.Helper';
import { checkData } from 'src/domain/challenge/util/checker';

@Injectable()
export class StatusCollector implements ChallengeUseCase<[number], Promise<ChallengeStatus>> {
  operation: ChallengeOperation = 'SELECT_CHALLENGE_STATUS';
  constructor(private readonly challengeHelper: ChallengeHelper) {}
  async handle(request: [number]): Promise<ChallengeStatus> {
    const [challengeId] = request;
    const challengeData: Challenge[] =
      await this.challengeHelper.giveChallengeByIdAndOngoing(challengeId);
    const challengeStatus: boolean = this.verifyChallengeStatus(challengeData);
    return ChallengeStatus.of(challengeStatus);
  }

  private verifyChallengeStatus(challengeData: Challenge[]): boolean {
    if (!checkData(challengeData[0])) return true;
    return false;
  }
}
