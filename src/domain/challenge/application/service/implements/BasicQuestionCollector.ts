import { Injectable } from '@nestjs/common';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { BasicQuestion } from 'src/domain/challenge/dto/response/BasicQuestion';
import { ChallengeOperation } from '../types/Operation';
import { QuestionHelper } from '../../helper/Question.Helper';

Injectable();
export class BasicQuestionCollector
  implements ChallengeUseCase<[number], Promise<BasicQuestion[]>>
{
  operation: ChallengeOperation = 'SELECT_BASIC_QUESTION';
  constructor(private readonly questionHelper: QuestionHelper) {}
  async handle(request: [number]): Promise<BasicQuestion[]> {
    const [challengeId] = request;
    const basicQuestionData = await this.questionHelper.giveBasicQuestionByChallengeId(challengeId);
    return BasicQuestion.of(basicQuestionData);
  }
}
