import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { Question } from 'src/domain/challenge/domain/entity/Question';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { UserTemplate } from '../../domain/entity/UserTemplate';
import { TemplateContent } from '../../dto/response/TemplateContent';
import { formatDate } from '../../util/date';
import { QuestionContent } from '../../domain/entity/QuestionContent';
import { DefaultQuestionContent } from '../../domain/entity/DefaultQuestionContent';

export abstract class TemplateCollector {
  protected abstract getAffiliation(
    affiliationData?: Affiliation,
    userChallengeData?: UserChallenge,
  ): Affiliation;

  protected abstract getAdditionalCondition(
    questionContent: QuestionContent | DefaultQuestionContent | undefined,
    userChallengeData?: UserChallenge,
  ): boolean;

  protected abstract getAdditionalConditions(
    questionContent: QuestionContent | DefaultQuestionContent | undefined,
    userChallengeData?: UserChallenge,
  ): boolean;

  public mergeTemplates(
    affiliationData: Affiliation,
    userTemplateDatas: UserTemplate[],
    questionDatas: Question[] | any,
    userChallengeDatas?: UserChallenge[],
  ): TemplateContent[][] {
    return userTemplateDatas.map((userTemplateData) => {
      return questionDatas.reduce((acc, questionData) => {
        const questionContent = userTemplateData
          .getQuestionContents()
          .find((content) => content.getQuestionId() === questionData.getId());
        const userChallengeData = userChallengeDatas?.find(
          (content) => content.getId() === userTemplateData.getUserChallengeId(),
        );
        const myLikeSign = userTemplateData.likes.some(
          (like) => like.getAffiliationId() === affiliationData.getId(),
        )
          ? '1'
          : '0';
        if (this.getAdditionalCondition(questionContent, userChallengeData)) {
          const affiliation = this.getAffiliation(affiliationData, userChallengeData);
          acc.push(
            TemplateContent.of(
              affiliation,
              questionData.getId(),
              userTemplateData.getId(),
              questionContent!,
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

  public mergeTemplatesForMongoData(
    affiliationData: Affiliation,
    userTemplateDatas: UserTemplate[],
    mongoQuestionDatas: any[],
    userChallengeDatas?: UserChallenge[],
  ): TemplateContent[][] {
    return userTemplateDatas.map((userTemplate) => {
      return mongoQuestionDatas.reduce((acc, mongoQuestion) => {
        const questionId = mongoQuestion._id.toString();
        const questionContent = userTemplate
          .getDefaultQuestionContents()
          .find((content) => content.getQuestionId() === questionId);

        const userChallengeData = userChallengeDatas?.find(
          (challenge) => challenge.getId() === userTemplate.getUserChallengeId(),
        );
        const myLikeSign = userTemplate.likes.some(
          (like) => like.getAffiliationId() === affiliationData.getId(),
        )
          ? '1'
          : '0';
        if (this.getAdditionalConditions(questionContent, userChallengeData)) {
          const affiliation = this.getAffiliation(affiliationData, userChallengeData);
          acc.push({
            position: affiliation.getPosition(),
            nickname: affiliation.getNickname(),
            company: affiliation.getCompany(),
            companyPublic: affiliation.getCompanyPublic(),
            profile: affiliation.getUser().getProfileImage(),
            questionId: questionId,
            userTemplateId: userTemplate.getId(),
            questionContentId: questionContent!.getId(),
            content: questionContent!.getContent(),
            createdAt: formatDate(userTemplate.getCreatedAt().toString()),
            visibility: questionContent.getVisibility(),
            category: mongoQuestion.type,
            question: mongoQuestion.content,
            affiliationId: affiliation.getId(),
            likeCount: userTemplate.getLikes().length.toString(),
            commentCount: userTemplate.getComments().length.toString(),
            myLikeSign: myLikeSign,
          });
        }
        return acc;
      }, [] as TemplateContent[]);
    });
  }
}
