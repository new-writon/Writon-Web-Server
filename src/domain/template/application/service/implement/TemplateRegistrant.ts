import { Injectable } from '@nestjs/common';
import { TemplateOperation } from '../types/Operation';
import { TemplateWrite } from '../../../dto/request/TemplateWrite';
import { DataSource } from 'typeorm';
import { TemplateVerifyService } from 'src/global/exception/template/TemplateVerify.Service';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { TemplateWriter } from '../TemplateWriter';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { QuestionContentHelper } from 'src/domain/template/application/helper/QuestionContent.Helper';
import { ChallengeApi } from 'src/domain/template/application/apis/Challenge.Api';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';
import { Transactional } from 'typeorm-transactional';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';
import { DefaultQuestionContentHelper } from '../../helper/DefaultQuestionContent.Helper';

@Injectable()
export class TemplateRegistrant
  extends TemplateWriter
  implements TemplateUseCase<[TemplateWrite, number], Promise<void>>
{
  operation: TemplateOperation = 'INSERT_TEMPLATE';

  constructor(
    private readonly userApi: UserApi,
    private readonly challengeApi: ChallengeApi,
    private readonly dataSource: DataSource,
    private readonly questionContentHelper: QuestionContentHelper,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly templateVerifyService: TemplateVerifyService,
    private readonly userVerifyService: UserVerifyService,
    private readonly defaultQuestionContentHelper: DefaultQuestionContentHelper,
  ) {
    super();
  }

  @Transactional()
  async handle(request: [TemplateWrite, number]): Promise<void> {
    const [templateWrite, userId] = request;
    const [userChallengeData, userTemplateComplete, challenge] = await Promise.all([
      this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(
        templateWrite.getChallengeId(),
        userId,
        templateWrite.getOrganization(),
      ),
      this.signUserChallengeComplete(templateWrite.getChallengeId(), templateWrite.getDate()),
      this.challengeApi.requestChallengeById(templateWrite.getChallengeId()),
    ]);
    this.userVerifyService.verifyUserChallenge(userChallengeData);
    const existingUserTemplateData =
      await this.userTemplateHelper.giveUserTemplateByUserChallengeIdAndDate(
        userChallengeData.getId(),
        templateWrite.getDate(),
      );
    this.templateVerifyService.verifyExistUserTemplate(existingUserTemplateData);

    const userTemplateData = await this.userTemplateHelper.exexuteInsertUserTemplate(
      userChallengeData.getId(),
      new Date(templateWrite.getDate()),
      userTemplateComplete,
    );
    const changedTemplate = super.changeUserTemplateType(
      templateWrite.getTemplateContent(),
      userTemplateData.getId(),
    );
    challenge.getStatus() === ChallengeStatusEnum.WRITON
      ? await this.defaultQuestionContentHelper.executeInsertDefaultQuestionContent(changedTemplate)
      : await this.questionContentHelper.executeInsertQuestionContent(changedTemplate);
  }

  private async signUserChallengeComplete(challengeId: number, date: string) {
    let complete = true;
    if (
      new Date(date).setHours(0, 0, 0, 0).toLocaleString() !==
      new Date().setHours(0, 0, 0, 0).toLocaleString()
    ) {
      complete = false;
    }
    if (!(await this.challengeApi.requestChallengeDayByChallengeIdAndDate(challengeId, date))) {
      complete = false;
    }
    return complete;
  }
}
