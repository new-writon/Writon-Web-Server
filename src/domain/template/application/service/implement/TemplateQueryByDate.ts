import { Injectable } from '@nestjs/common';
import { TemplateOperation } from '../types/Operation';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { sortCompanyPublicArray, sortCompanyPublicArrayForObject } from '../../../util/data';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { TemplateInformation } from '../../../dto/response/TemplateInformation';
import { TemplateCollector } from '../TemplateCollector';
import { QuestionContent } from 'src/domain/template/domain/entity/QuestionContent';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';
import { ChallengeApi } from 'src/domain/template/application/apis/Challenge.Api';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

@Injectable()
export class TemplateQueryByDate
  extends TemplateCollector
  implements TemplateUseCase<[number, string, number, Date], Promise<TemplateInformation | []>>
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
    const [affiliationData, userChallengeDatas, challenge] = await Promise.all([
      this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
      this.userApi.requestUserChallengeAndAffiliationAndUserByChallengeId(challengeId),
      this.challengeApi.requestChallengeById(challengeId),
    ]);
    const userChallengeIds = this.extractUserChallengeId(userChallengeDatas);
    const userTemplateData =
      challenge.getStatus() === ChallengeStatusEnum.WRITON
        ? await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndDefaultQeustionContentByUserChallengeIdAndDate(
            userChallengeIds,
            date,
          )
        : await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(
            userChallengeIds,
            date,
          );
    return userTemplateData.length === 0
      ? []
      : this.proccessTemplateAccordingToDateData(
          userTemplateData,
          affiliationData,
          userChallengeDatas,
          challenge.getStatus(),
        );
  }

  private async proccessTemplateAccordingToDateData(
    userTemplateData: UserTemplate[],
    affiliationData: Affiliation,
    userChallengeDatas: UserChallenge[],
    status: ChallengeStatusEnum,
  ) {
    const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData, status);
    const questionData =
      status === ChallengeStatusEnum.WRITON
        ? await this.challengeApi.requestDefaultQuestion()
        : await this.challengeApi.requestQuestionById(questionIds);
    const challengeCompleteCount = this.dataMapperService.extractCompleteCount(userTemplateData);
    const mergedForManyTemplates =
      status === ChallengeStatusEnum.WRITON
        ? super.mergeTemplatesForMongoData(
            affiliationData,
            userTemplateData,
            questionData,
            userChallengeDatas,
          )
        : super.mergeTemplates(affiliationData, userTemplateData, questionData);
    const sortedCompanyData =
      status === ChallengeStatusEnum.WRITON
        ? sortCompanyPublicArrayForObject(mergedForManyTemplates)
        : sortCompanyPublicArray(mergedForManyTemplates);

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

  protected getAdditionalConditions(
    questionContent: QuestionContent | undefined,
    userChallengeData?: UserChallenge,
  ): boolean {
    return !!questionContent;
  }

  private extractUserChallengeId(userChallenge: UserChallenge[]) {
    return userChallenge.map((data) => data.getId());
  }
}
