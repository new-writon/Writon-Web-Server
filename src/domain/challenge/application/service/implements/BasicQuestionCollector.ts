import { Inject, Injectable } from '@nestjs/common';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { BasicQuestion } from 'src/domain/challenge/dto/response/BasicQuestion';
import { ChallengeOperation } from '../types/Operation';
import { QuestionHelper } from '../../helper/Question.Helper';
import { ChallengeHelper } from '../../helper/Challenge.Helper';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';
import { DefaultQuestionRepository } from '../../port/output/DefaultQuestion.Repository';

@Injectable()
export class BasicQuestionCollector
  implements ChallengeUseCase<[number], Promise<BasicQuestion[]>>
{
  operation: ChallengeOperation = 'SELECT_BASIC_QUESTION';
  constructor(
    private readonly questionHelper: QuestionHelper,
    private readonly challengeHelper: ChallengeHelper,
    @Inject('defaultquestionImpl')
    private readonly defaultQuestionRepository: DefaultQuestionRepository,
  ) {}
  async handle(request: [number]) {
    const [challengeId] = request;
    const challenge = await this.challengeHelper.giveChallengeById(challengeId);
    const questions =
      challenge.getStatus() === ChallengeStatusEnum.WRITON
        ? await this.defaultQuestionRepository.findDefaultBasicQuestion()
        : await this.questionHelper.giveBasicQuestionByChallengeId(challengeId);
    return BasicQuestion.of(questions, challenge.getStatus());
  }
}
