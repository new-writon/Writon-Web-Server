import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { TemplateOperation } from '../types/Operation';
import { TemplateContent } from '../../../dto/response/TemplateContent';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { sortCompanyPublic } from '../../../util/data';
import { formatDate } from '../../../util/date';
import { Question } from 'src/domain/challenge/domain/entity/Question';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { UserApi } from 'src/domain/template/infrastructure/adapter/output/apis/User.Api';
import { UserTemplateHelper } from 'src/domain/template/infrastructure/adapter/input/helper/UserTemplate.Helper';
import { ChallengeApi } from 'src/domain/template/infrastructure/adapter/output/apis/Challenge.Api';

@Injectable()
export class TemplateFetcher
  implements TemplateHandler<[number, string, boolean, number], Promise<TemplateContent[]>>
{
  operation: TemplateOperation = 'SELECT_SINGLE_TEMPLATE';

  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly dataMapperService: DataMapperService,
    private readonly challengeApi: ChallengeApi,
  ) {}

  async handle(request: [number, string, boolean, number]): Promise<TemplateContent[]> {
    const [userTemplateId, organization, visibility, userId] = request;
    const [affiliationData, userTemplateData] = await Promise.all([
      this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
      this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(
        userTemplateId,
        visibility,
      ),
    ]);
    return userTemplateData === null
      ? []
      : this.proccessTemplateContent(userTemplateData, affiliationData);
  }

  private async proccessTemplateContent(
    userTemplateData: UserTemplate,
    affiliationData: Affiliation,
  ) {
    const questionIds = this.dataMapperService.extractQuestionId(userTemplateData);
    const [questionData, userChallengeData] = await Promise.all([
      this.challengeApi.requestQuestionById(questionIds),
      this.userApi.requestUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
        userTemplateData.getUserChallengeId(),
      ),
    ]);
    const mergedForOneTemplate = this.mergeForOneTemplate(
      affiliationData,
      userTemplateData,
      questionData,
      userChallengeData,
    );
    const sortedCompanyData = sortCompanyPublic(mergedForOneTemplate) as TemplateContent[];
    return sortedCompanyData;
  }

  private mergeForOneTemplate(
    affiliationData: Affiliation,
    userTemplateData: UserTemplate,
    questionDatas: Question[],
    userChallengeData: UserChallenge,
  ) {
    return questionDatas.map((questionData) => {
      const questionContent = userTemplateData
        .getQuestionContents()
        .find((content) => content.getQuestionId() === questionData.getId());
      const myLikeSign = userTemplateData.likes.some(
        (like) => like.getAffiliationId() === affiliationData.getId(),
      )
        ? '1'
        : '0';
      const userChallengeAfiliation = userChallengeData.getAffiliation();
      return TemplateContent.of(
        userChallengeAfiliation,
        questionData.getId(),
        userTemplateData.getId(),
        questionContent,
        formatDate(userTemplateData.getCreatedAt().toString()),
        questionData,
        userTemplateData.getLikes().length.toString(),
        userTemplateData.getComments().length.toString(),
        myLikeSign,
      );
    });
  }
}
