import { Inject, Injectable } from '@nestjs/common';
import { DefaultQuestionRepository } from '../port/output/DefaultQuestion.Repository';

@Injectable()
export class DefaultQuestionHelper {
  constructor(
    @Inject('defaultquestionImpl')
    private readonly defaultQuestionRepository: DefaultQuestionRepository,
  ) {}

  giveDefaultQuestion() {
    return this.defaultQuestionRepository.findDefaultQuestion();
  }
}
