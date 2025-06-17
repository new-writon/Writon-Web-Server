import { Injectable } from '@nestjs/common';
import { TemplateOperation } from '../types/Operation';
import { TemplateContent } from '../../../dto/response/TemplateContent';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { sortCompanyPublic, sortCompanyPublicForObject } from '../../../util/data';
import { formatDate } from '../../../util/date';
import { Question } from 'src/domain/challenge/domain/entity/Question';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';
import { ChallengeApi } from 'src/domain/template/application/apis/Challenge.Api';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

@Injectable()
export class TemplateFetcher
  implements TemplateUseCase<[number, string, boolean, number, number], Promise<TemplateContent[]>>
{
  operation: TemplateOperation = 'SELECT_SINGLE_TEMPLATE';

  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly dataMapperService: DataMapperService,
    private readonly challengeApi: ChallengeApi,
  ) {}

  async handle(request: [number, string, boolean, number, number]): Promise<TemplateContent[]> {
    const [userTemplateId, organization, visibility, challengeId, userId] = request;
    const challenge = await this.challengeApi.requestChallengeById(challengeId);

    const isWriton = challenge.getStatus() === ChallengeStatusEnum.WRITON;
    const [affiliationData, userTemplateData] = await Promise.all([
      this.userApi.requestAffiliationAndUserByUserIdAndOrganization(userId, organization),
      isWriton
        ? await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndDefaultQeustionContentByUserTemplateIdWithVisibility(
            userTemplateId,
            visibility,
          )
        : await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(
            userTemplateId,
            visibility,
          ),
    ]);
    return userTemplateData === null
      ? []
      : this.proccessTemplateContent(userTemplateData, affiliationData, challenge.getStatus());
  }

  private async proccessTemplateContent(
    userTemplateData: UserTemplate,
    affiliationData: Affiliation,
    status: ChallengeStatusEnum,
  ) {
    const questionIds = this.dataMapperService.extractQuestionId(userTemplateData);
    const [questionData, userChallengeData] = await Promise.all([
      status === ChallengeStatusEnum.WRITON
        ? await this.challengeApi.requestDefaultQuestion()
        : await this.challengeApi.requestQuestionById(questionIds),
      await this.userApi.requestUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
        userTemplateData.getUserChallengeId(),
      ),
    ]);

    const mergedForOneTemplate =
      status === ChallengeStatusEnum.WRITON
        ? this.mergeForOneTemplateForMongoData(
            affiliationData,
            userTemplateData,
            questionData,
            userChallengeData,
          )
        : (this.mergeForOneTemplate(
            affiliationData,
            userTemplateData,
            questionData,
            userChallengeData,
          ) as TemplateContent[]);
    const sortedCompanyData =
      status === ChallengeStatusEnum.WRITON
        ? sortCompanyPublicForObject(mergedForOneTemplate)
        : sortCompanyPublic(mergedForOneTemplate);
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

  public mergeForOneTemplateForMongoData(
    affiliationData: Affiliation,
    userTemplateData: UserTemplate,
    mongoQuestionDatas: any[],
    userChallengeData?: UserChallenge,
  ) {
    return mongoQuestionDatas.map((questionData) => {
      const questionContent = userTemplateData
        .getDefaultQuestionContents()
        .find((content) => content.getQuestionId() === questionData._id.toString());
      const myLikeSign = userTemplateData.likes.some(
        (like) => like.getAffiliationId() === affiliationData.getId(),
      )
        ? '1'
        : '0';
      const userChallengeAfiliation = userChallengeData.getAffiliation();
      return {
        position: userChallengeAfiliation.getPosition(),
        nickname: userChallengeAfiliation.getNickname(),
        company: userChallengeAfiliation.getCompany(),
        companyPublic: userChallengeAfiliation.getCompanyPublic(),
        profile: userChallengeAfiliation.getUser().getProfileImage(),
        questionId: questionData._id,
        userTemplateId: userTemplateData.getId(),
        questionContentId: questionContent!.getId(),
        content: questionContent!.getContent(),
        createdAt: formatDate(userTemplateData.getCreatedAt().toString()),
        visibility: questionContent.getVisibility(),
        category: questionData.type,
        question: questionData.content,
        affiliationId: userChallengeAfiliation.getId(),
        likeCount: userTemplateData.getLikes().length.toString(),
        commentCount: userTemplateData.getComments().length.toString(),
        myLikeSign: myLikeSign,
      };
    });
  }
}
