import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { TemplateOperation } from '../types/Operation';
import { TemplateContent } from '../../dto/response/TemplateContent';
import { UserTemplate } from '../../domain/entity/UserTemplate';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { sortCompanyPublic, sortCompanyPublicArray } from '../../util/data';
import { formatDate } from '../../util/date';
import { Question } from 'src/domain/challenge/domain/entity/Question';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { UserTemplateHelper } from '../../helper/UserTemplate.Helper';
import { UserApi } from '../../infrastructure/User.Api';
import { DataMapperService } from '../../domain/service/DataMappper.Service';
import { ChallengeApi } from '../../infrastructure/Challenge.Api';
import { TemplateInformation } from '../../dto/response/TemplateInformation';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';

@Injectable()
export class TemplateQueryByDate
  implements TemplateHandler<[number, string, number, Date], Promise<TemplateInformation | []>>
{
  operation: TemplateOperation = 'SELECT_TEMPLATE_BY_DATE';

  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly dataMapperService: DataMapperService,
    private readonly challengeApi: ChallengeApi,
    private readonly userVerifyService: UserVerifyService,
  ) {}

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
    const mergedForManyTemplates = this.mergeForAllManyTemplates(
      affiliationData,
      userTemplateData,
      questionData,
      userChallengeDatas,
    );
    const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates);
    return TemplateInformation.of(challengeCompleteCount, sortedCompanyData);
  }
  private mergeForAllManyTemplates(
    affiliationData: Affiliation,
    userTemplateDatas: UserTemplate[],
    questionDatas: Question[],
    userChallengeDatas: UserChallenge[],
  ): TemplateContent[][] {
    return userTemplateDatas.map((userTemplateData) => {
      return questionDatas.reduce((acc, questionData) => {
        const questionContent = userTemplateData
          .getQuestionContents()
          .find((content) => content.getQuestionId() === questionData.getId());
        const userChallengeData = userChallengeDatas.find(
          (content) => content.getId() === userTemplateData.getUserChallengeId(),
        );
        const myLikeSign = userTemplateData.likes.some(
          (like) => like.getAffiliationId() === affiliationData.getId(),
        )
          ? '1'
          : '0';
        if (questionContent && userChallengeData) {
          const userChallengeAffiliation = userChallengeData.getAffiliation();
          acc.push(
            TemplateContent.of(
              userChallengeAffiliation,
              questionData.getId(),
              userTemplateData.getId(),
              questionContent,
              formatDate(userTemplateData.getCreatedAt().toString()),
              questionData,
              userTemplateData.getLikes().length.toString(),
              userTemplateData.getComments().length.toString(),
              myLikeSign,
            ),
          );
        }
        return acc;
      }, []);
    });
  }
  private extractUserChallengeId(userChallenge: UserChallenge[]) {
    return userChallenge.map((data) => data.getId());
  }
  public async bringAllTemplateContent(
    userId: number,
    organization: string,
    challengeId: number,
  ): Promise<TemplateInformation | []> {
    const affiliationData = await this.userApi.requestAffiliationAndUserByUserIdAndOrganization(
      userId,
      organization,
    );
    // 검증하기
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
  private async proccessTemplateData(
    userTemplateData: UserTemplate[],
    affiliationData: Affiliation,
  ) {
    const questionIds = this.dataMapperService.extractQuestionIds(userTemplateData);
    const questionData = await this.challengeApi.requestQuestionById(questionIds);
    const mergedForManyTemplates = this.mergeForMyManyTemplates(
      affiliationData,
      userTemplateData,
      questionData,
    );
    const sortedCompanyData = sortCompanyPublicArray(mergedForManyTemplates);
    return TemplateInformation.of(undefined, sortedCompanyData);
  }

  private mergeForMyManyTemplates(
    affiliationData: Affiliation,
    userTemplateDatas: UserTemplate[],
    questionDatas: Question[],
  ): TemplateContent[][] {
    return userTemplateDatas.map((userTemplateData) => {
      return questionDatas.reduce((acc, questionData) => {
        const questionContent = userTemplateData
          .getQuestionContents()
          .find((content) => content.getQuestionId() === questionData.getId());
        const myLikeSign = userTemplateData.likes.some(
          (like) => like.getAffiliationId() === affiliationData.getId(),
        )
          ? '1'
          : '0';
        if (questionContent) {
          acc.push(
            TemplateContent.of(
              affiliationData,
              questionData.getId(),
              userTemplateData.getId(),
              questionContent,
              formatDate(userTemplateData.getCreatedAt().toString()),
              questionData,
              userTemplateData.getLikes().length.toString(),
              userTemplateData.getComments().length.toString(),
              myLikeSign,
            ),
          );
        }
        return acc;
      }, []);
    });
  }
}
