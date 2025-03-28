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
export class TemplateQueryByDate
  extends TemplateCollector
  implements TemplateHandler<[number, string, number, Date], Promise<TemplateInformation | []>>
{
  operation: TemplateOperation = 'SELECT_TEMPLATE_BY_DATE';

  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly dataMapperService: DataMapperService,
    private readonly challengeApi: ChallengeApi,
  ) {
    super();
  }

  async handle(request: [number, string, number, Date]): Promise<TemplateInformation | []> {
    const [userId, organization, challengeId, date] = request;
    const [affiliationData, userChallengeDatas] = await Promise.all([
      this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
      this.userApi.requestUserChallengeAndAffiliationAndUserByChallengeId(challengeId),
    ]);
    const userChallengeIds = this.extractUserChallengeId(userChallengeDatas);
    const userTemplateData =
      await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(
        userChallengeIds,
        date,
      );
    console.log(userTemplateData);
    return userTemplateData.length === 0
      ? []
      : this.proccessTemplateAccordingToDateData(
          userTemplateData,
          affiliationData,
          userChallengeDatas,
        );
  }

  private async proccessTemplateAccordingToDateData(
    userTemplateData: UserTemplate[],
    affiliationData: Affiliation,
    userChallengeDatas: UserChallenge[],
  ) {
    const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData);
    const questionData = await this.challengeApi.requestQuestionById(questionIds);
    const challengeCompleteCount = this.dataMapperService.extractCompleteCount(userTemplateData);
    const mergedForManyTemplates = super.mergeTemplates(
      affiliationData,
      userTemplateData,
      questionData,
      userChallengeDatas,
    );
    const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates);

    return TemplateInformation.of(challengeCompleteCount, sortedCompanyData);
  }

  protected getAffiliation(
    affiliationData: Affiliation,
    userChallengeData?: UserChallenge,
  ): Affiliation {
    return userChallengeData!.getAffiliation();
  }

  protected getAdditionalCondition(
    questionContent: QuestionContent | undefined,
    userChallengeData?: UserChallenge,
  ): boolean {
    return !!questionContent && !!userChallengeData;
  }

  private extractUserChallengeId(userChallenge: UserChallenge[]) {
    return userChallenge.map((data) => data.getId());
  }
}
