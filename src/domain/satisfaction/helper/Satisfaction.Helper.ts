import { Inject, Injectable } from '@nestjs/common';
import { SatisfactionRepository } from '../domain/repository/Satisfaction.Repository';
import { SatisfactionVerifyService } from '../../../global/exception/satisfaction/SatisfactionVerify.Service';
import { Satisfaction } from '../domain/entity/Satisfaction';

@Injectable()
export class SatisfactionHelper {
  constructor(
    @Inject('satisfactionImpl')
    private readonly satisfactionRepository: SatisfactionRepository,
    private readonly satisfactionVerifyService: SatisfactionVerifyService,
  ) {}

  public async giveSatisfactionByChallengeId(
    challengeId: number,
    verifyFlag: boolean,
  ): Promise<Satisfaction[]> {
    const satisfactionDatas =
      await this.satisfactionRepository.findSatisfactionByChallengeId(challengeId);
    if (verifyFlag) {
      this.satisfactionVerifyService.verifySatisfaction(satisfactionDatas);
    }
    return satisfactionDatas;
  }
}
