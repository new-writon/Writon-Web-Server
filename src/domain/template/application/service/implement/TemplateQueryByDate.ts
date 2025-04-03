import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { TemplateOperation } from '../types/Operation';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { sortCompanyPublic, sortCompanyPublicArray } from '../../../util/data';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { TemplateInformation } from '../../../dto/response/TemplateInformation';
import { TemplateCollector } from '../TemplateCollector';
import { QuestionContent } from 'src/domain/template/domain/entity/QuestionContent';
import { UserApi } from 'src/domain/template/infrastructure/adapter/output/apis/User.Api';
import { UserTemplateHelper } from 'src/domain/template/infrastructure/adapter/input/helper/UserTemplate.Helper';
import { ChallengeApi } from 'src/domain/template/infrastructure/adapter/output/apis/Challenge.Api';

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
