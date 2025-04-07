import { Injectable } from '@nestjs/common';
import { checkData } from '../../../domain/auth/util/checker';
import { Satisfaction } from '../../../domain/satisfaction/domain/entity/Satisfaction';
import { SatisfactionErrorCode } from './SatisfactionErrorCode';
import { SatisfactionException } from './SatisfactionException';

@Injectable()
export class SatisfactionVerifyService {
  public verifySatisfaction(satisfaction: Satisfaction[]) {
    if (!checkData(satisfaction))
      throw new SatisfactionException(SatisfactionErrorCode.NOT_FOUND_SATISFACTION_QUESTION);
  }
}
