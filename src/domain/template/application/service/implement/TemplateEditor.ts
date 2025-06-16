import { Injectable } from '@nestjs/common';
import { TemplateUpdate } from '../../../dto/request/TemplateUpdate';
import { TemplateOperation } from '../types/Operation';
import { Transactional } from 'typeorm-transactional';
import { TemplateWriter } from '../TemplateWriter';
import { DataSource } from 'typeorm';
import { QuestionContentHelper } from 'src/domain/template/application/helper/QuestionContent.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';
import { DefaultQuestionContentHelper } from '../../helper/DefaultQuestionContent.Helper';
import { ChallengeApi } from '../../apis/Challenge.Api';
import { UserTemplateHelper } from '../../helper/UserTemplate.Helper';
import { UserApi } from '../../apis/User.Api';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

@Injectable()
export class TemplateEditor
  extends TemplateWriter
  implements TemplateUseCase<[TemplateUpdate], Promise<void>>
{
  operation: TemplateOperation = 'UPDATE_TEMPLATE';

  constructor(
    private readonly questionContentHelper: QuestionContentHelper,
    private readonly defaultQuestionContentHelper: DefaultQuestionContentHelper,
    private readonly challengeApi: ChallengeApi,
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  @Transactional()
  async handle(request: [TemplateUpdate]): Promise<void> {
    const [templateUpdate] = request;
    const userTemplate = await this.userTemplateHelper.findUserTemplateById(
      templateUpdate.getUserTemplateId(),
    );
    const userChallenge = await this.userApi.requestUserChallengeById(
      userTemplate.getUserChallengeId(),
    );
    const challenge = await this.challengeApi.requestChallengeById(userChallenge.getChallengeId());

    const isWriton = challenge.getStatus() === ChallengeStatusEnum.WRITON;
    const [deleteFn, insertFn] = isWriton
      ? [
          await this.defaultQuestionContentHelper.executeDeleteDefaultQuestionContent.bind(
            this.defaultQuestionContentHelper,
          ),
          await this.defaultQuestionContentHelper.executeInsertDefaultQuestionContent.bind(
            this.defaultQuestionContentHelper,
          ),
        ]
      : [
          await this.questionContentHelper.executeDeleteQuestionContent.bind(
            this.questionContentHelper,
          ),
          await this.questionContentHelper.executeInsertQuestionContent.bind(
            this.questionContentHelper,
          ),
        ];

    await deleteFn(templateUpdate.getUserTemplateId());
    const changedTemplate = super.changeUserTemplateType(
      templateUpdate.getTemplateContent(),
      templateUpdate.getUserTemplateId(),
    );

    await insertFn(changedTemplate);
  }
}
