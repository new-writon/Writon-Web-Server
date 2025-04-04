import { Inject, Injectable } from '@nestjs/common';
import { BaseChallengeInputPort } from './BaseChallengeInputPort';
import { ChallengeUseCase } from './ChallengeUseCase';

@Injectable()
export class InformationInputPort extends BaseChallengeInputPort {
  constructor(@Inject('INFORMATION_HANDLERS') handlers: ChallengeUseCase<any, any>[]) {
    super(handlers);
  }
}
