import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { TemplateOperation } from '../../types/Operation';
import { TemplateContent } from '../../../dto/response/TemplateContent';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { sortCompanyPublic, sortCompanyPublicArray } from '../../../util/data';
import { formatDate } from '../../../util/date';
import { Question } from 'src/domain/challenge/domain/entity/Question';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { UserTemplateHelper } from '../../../helper/UserTemplate.Helper';
import { UserApi } from '../../../infrastructure/User.Api';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { ChallengeApi } from '../../../infrastructure/Challenge.Api';
import { TemplateInformation } from '../../../dto/response/TemplateInformation';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { TemplateCollector } from '../TemplateCollector';
import { QuestionContent } from 'src/domain/template/domain/entity/QuestionContent';

@Injectable()
export class MyTemplateCollector
  extends TemplateCollector
  implements TemplateHandler<[number, string, number], Promise<TemplateInformation | []>>
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
    const userTemplateData =
      await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(
        userChallengeData.getId(),
      );
    return userTemplateData.length === 0
      ? []
      : this.proccessTemplateData(userTemplateData, affiliationData);
  }

  protected async proccessTemplateData(
    userTemplateData: UserTemplate[],
    affiliationData: Affiliation,
  ) {
    const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData);
    const questionData = await this.challengeApi.requestQuestionById(questionIds);
    const mergedForManyTemplates = super.mergeTemplates(
      affiliationData,
      userTemplateData,
      questionData,
    );
    const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates);
    return TemplateInformation.of(undefined, sortedCompanyData);
  }

  protected getAffiliation(affiliationData: Affiliation): Affiliation {
    return affiliationData;
  }

  protected getAdditionalCondition(questionContent: QuestionContent | undefined): boolean {
    return !!questionContent;
  }
}
