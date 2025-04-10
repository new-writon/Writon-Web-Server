import { Inject, Injectable } from '@nestjs/common';
import { BaseChallengeInputPort } from './BaseChallengeInputPort';
import { ChallengeUseCase } from './ChallengeUseCase';

@Injectable()
export class InviteInputPort extends BaseChallengeInputPort {
  constructor(@Inject('INVITE_HANDLERS') handlers: ChallengeUseCase<any, any>[]) {
    super(handlers);
  }
}
