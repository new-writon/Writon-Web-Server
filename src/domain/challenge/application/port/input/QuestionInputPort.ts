import { Inject, Injectable } from '@nestjs/common';
import { ChallengeUseCase } from './ChallengeUseCase';
import { BaseChallengeInputPort } from './BaseChallengeInputPort';

@Injectable()
export class QuestionInputPort extends BaseChallengeInputPort {
  constructor(@Inject('QUESTION_HANDLERS') handlers: ChallengeUseCase<any, any>[]) {
    super(handlers);
  }
}
