import { Inject, Injectable } from '@nestjs/common';
import { SpecialQuestion } from 'src/domain/challenge/dto/response/SpecialQuestion';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeOperation } from '../types/Operation';
import { QuestionHelper } from '../../helper/Question.Helper';
import { ChallengeHelper } from '../../helper/Challenge.Helper';
import { DefaultQuestionRepository } from '../../port/output/DefaultQuestion.Repository';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

@Injectable()
export class SpecialQuestionCollector
  implements ChallengeUseCase<[number], Promise<SpecialQuestion[]>>
{
  operation: ChallengeOperation = 'SELECT_SPECIAL_QUESTION';
  constructor(
    private readonly questionHelper: QuestionHelper,
    private readonly challengeHelper: ChallengeHelper,
    @Inject('defaultquestionImpl')
    private readonly defaultQuestionRepository: DefaultQuestionRepository,
  ) {}
  async handle(request: [number]): Promise<SpecialQuestion[]> {
    const [challengeId] = request;
    const challenge = await this.challengeHelper.giveChallengeById(challengeId);
    const questions =
      challenge.getStatus() === ChallengeStatusEnum.WRITON
        ? await this.defaultQuestionRepository.findDefaultSpecialQuestion()
        : await this.questionHelper.giveSpecialQuestionByChallengeId(challengeId);
    return SpecialQuestion.of(questions, challenge.getStatus());
  }
}
