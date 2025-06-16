import { Injectable } from '@nestjs/common';
import { TemplateOperation } from '../types/Operation';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { sortCompanyPublicArray, sortCompanyPublicArrayForObject } from '../../../util/data';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { TemplateInformation } from '../../../dto/response/TemplateInformation';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { TemplateCollector } from '../TemplateCollector';
import { QuestionContent } from 'src/domain/template/domain/entity/QuestionContent';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';
import { ChallengeApi } from 'src/domain/template/application/apis/Challenge.Api';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

@Injectable()
export class MyTemplateCollector
  extends TemplateCollector
  implements TemplateUseCase<[number, string, number], Promise<TemplateInformation | []>>
{
  operation: TemplateOperation = 'SELECT_MY_TEMPLATE';

  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly dataMapperService: DataMapperService,
    private readonly challengeApi: ChallengeApi,
    private readonly userVerifyService: UserVerifyService,
  ) {
    super();
  }

  async handle(request: [number, string, number]): Promise<TemplateInformation | []> {
    const [userId, organization, challengeId] = request;
    const affiliationData = await this.userApi.requestAffiliationAndUserByUserIdAndOrganization(
      userId,
      organization,
    );
    const userChallengeData = await this.userApi.requestUserChallengeByAffiliationIdAndChallengeId(
      affiliationData.getId(),
      challengeId,
    );
    this.userVerifyService.verifyUserChallenge(userChallengeData);
    const challenge = await this.challengeApi.requestChallengeById(
      userChallengeData.getChallengeId(),
    );
    const userTemplateData =
      challenge.getStatus() === ChallengeStatusEnum.WRITON
        ? await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndDefaultQeustionContentByUserChallengeId(
            userChallengeData.getId(),
          )
        : await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(
            userChallengeData.getId(),
          );
    return userTemplateData.length === 0
      ? []
      : this.proccessTemplateData(userTemplateData, affiliationData, challenge.getStatus());
  }

  protected async proccessTemplateData(
    userTemplateData: UserTemplate[],
    affiliationData: Affiliation,
    status: ChallengeStatusEnum,
  ) {
    const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData, status);
    const questionData =
      status === ChallengeStatusEnum.WRITON
        ? await this.challengeApi.requestDefaultQuestion()
        : await this.challengeApi.requestQuestionById(questionIds);

    const mergedForManyTemplates =
      status === ChallengeStatusEnum.WRITON
        ? super.mergeTemplatesForMongoData(affiliationData, userTemplateData, questionData)
        : super.mergeTemplates(affiliationData, userTemplateData, questionData);
    const sortedCompanyData =
      status === ChallengeStatusEnum.WRITON
        ? sortCompanyPublicArrayForObject(mergedForManyTemplates)
        : sortCompanyPublicArray(mergedForManyTemplates);
    return TemplateInformation.of(undefined, sortedCompanyData);
  }

  protected getAffiliation(affiliationData: Affiliation): Affiliation {
    return affiliationData;
  }

  protected getAdditionalCondition(questionContent: QuestionContent | undefined): boolean {
    return !!questionContent;
  }
}
