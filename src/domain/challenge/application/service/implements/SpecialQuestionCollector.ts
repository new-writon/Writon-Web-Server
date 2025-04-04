import { Injectable } from '@nestjs/common';
import { SpecialQuestion } from 'src/domain/challenge/dto/response/SpecialQuestion';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeOperation } from '../types/Operation';
import { QuestionHelper } from '../../helper/Question.Helper';

Injectable();
export class SpecialQuestionCollector
  implements ChallengeUseCase<[number], Promise<SpecialQuestion[]>>
{
  operation: ChallengeOperation = 'SELECT_SPECIAL_QUESTION';
  constructor(private readonly questionHelper: QuestionHelper) {}
  async handle(request: [number]): Promise<SpecialQuestion[]> {
    const [challengeId] = request;
    const specialQuestionData =
      await this.questionHelper.giveSpecialQuestionByChallengeId(challengeId);
    return SpecialQuestion.of(specialQuestionData);
  }
}
