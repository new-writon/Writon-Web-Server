import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';

import { Question } from 'src/domain/challenge/domain/entity/Question';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { DataMapperService } from '../../domain/service/DataMappper.Service';
import { ChallengeApi } from '../../infrastructure/Challenge.Api';
import { UserTemplate } from '../../domain/entity/UserTemplate';
import { TemplateContent } from '../../dto/response/TemplateContent';
import { formatDate } from '../../util/date';
import { QuestionContent } from '../../domain/entity/QuestionContent';

export abstract class TemplateCollector {
  protected abstract getAffiliation(
    affiliationData?: Affiliation,
    userChallengeData?: UserChallenge,
  ): Affiliation;

  protected abstract getAdditionalCondition(
    questionContent: QuestionContent | undefined,
    userChallengeData?: UserChallenge,
  ): boolean;

  public mergeTemplates(
    affiliationData: Affiliation,
    userTemplateDatas: UserTemplate[],
    questionDatas: Question[],
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
}
