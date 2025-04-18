import { Inject, Injectable } from '@nestjs/common';
import { UserApi } from '../../apis/User.Api';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeOperation } from '../types/Operation';
import { DefaultQuestionRepository } from '../../port/output/DefaultQuestion.Repository';

@Injectable()
export class DefaultQuestionCollector implements ChallengeUseCase<[number], Promise<any>> {
  constructor(
    private readonly userApi: UserApi,
    @Inject('defaultquestionImpl')
    private readonly defaultQuestionRepository: DefaultQuestionRepository,
  ) {}
  operation: ChallengeOperation = 'SELECT_DEFAULT_QUESTION';
  async handle(request: [number]): Promise<any> {
    const [userId] = request;
    const userData = await this.userApi.requestUserById(userId);
    // 검증 로직
    await this.defaultQuestionRepository.insertDefaultQuestion();
    const result = await this.defaultQuestionRepository.findDefaultQuestion();
    console.log(result);

    return 'a';
  }
}
