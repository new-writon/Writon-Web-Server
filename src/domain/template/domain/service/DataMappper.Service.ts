import { Injectable } from '@nestjs/common';
import { Comment } from '../entity/Comment';
import { UserTemplate } from '../entity/UserTemplate';
import { Question } from 'src/domain/challenge/domain/entity/Question';
import { Likes } from '../entity/Likes';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

@Injectable()
export class DataMapperService {
  public extractUserChallengeId(comments: Comment[]): number[] {
    return comments.map((e) => {
      return e.userTemplate.getUserChallengeId();
    });
  }

  public extractAffiliationId(commentDatas: Comment[] | Likes[]) {
    return commentDatas.map((data) => data.getAffiliationId());
  }

  public extractQuestionIdFromQuetion(questionDatas: Question[]) {
    return questionDatas.map((data) => data.getId());
  }

  public extractCompleteCount(userTemplates: UserTemplate[]) {
    return userTemplates.map((userTemplate) => userTemplate.getComplete()).length;
  }

  public extractQuestionId(userTemplate: UserTemplate) {
    return userTemplate.getQuestionContents()?.map((data) => data.getQuestionId());
  }

  public extractQuestionIds(userTemplates: UserTemplate[], status?: ChallengeStatusEnum) {
    return userTemplates.flatMap((userTemplate) => {
      const contents =
        status === ChallengeStatusEnum.WRITON
          ? userTemplate.getDefaultQuestionContents()
          : userTemplate.getQuestionContents();
      return contents.map((questionContent) => questionContent.getQuestionId());
    });
  }
}
