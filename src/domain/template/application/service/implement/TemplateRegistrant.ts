import { Injectable } from '@nestjs/common';
import { TemplateOperation } from '../types/Operation';
// import { Transactional } from 'src/global/decorator/transaction';
import { TemplateWrite } from '../../../dto/request/TemplateWrite';
import { DataSource } from 'typeorm';
import { TemplateVerifyService } from 'src/global/exception/template/TemplateVerify.Service';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { TemplateWriter } from '../TemplateWriter';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { QuestionContentHelper } from 'src/domain/template/application/helper/QuestionContent.Helper';
import { ChallengeApi } from 'src/domain/template/application/apis/Challenge.Api';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';
import { Transactional } from 'nestjs-transaction';

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
  ) {
    super();
  }

  @Transactional()
  async handle(request: [TemplateWrite, number]): Promise<void> {
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.startTransaction();

    // try {
    const [templateWrite, userId] = request;
    const [userChallengeData, userTemplateComplete, questionDatas] = await Promise.all([
      this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(
        templateWrite.getChallengeId(),
        userId,
        templateWrite.getOrganization(),
      ),
      this.signUserChallengeComplete(templateWrite.getChallengeId(), templateWrite.getDate()),
      this.challengeApi.requestQuestionsByChallengeId(templateWrite.getChallengeId()),
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

    await this.questionContentHelper.executeInsertQuestionContent(changedTemplate);

    // 트랜잭션 커밋
    //   await queryRunner.commitTransaction();
    // } catch (error) {
    //   // 트랜잭션 롤백
    //   await queryRunner.rollbackTransaction();
    //   throw error; // 예외를 다시 던져서 외부에서 처리하도록 함
    // } finally {
    //   await queryRunner.release(); // 쿼리 실행 종료
    // }
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
