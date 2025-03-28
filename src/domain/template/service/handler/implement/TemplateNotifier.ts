import { Injectable } from '@nestjs/common';

import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { TemplateHandler } from '../TemplateHandler';

import { TemplateOperation } from '../../types/Operation';
import { UserTemplateHelper } from 'src/domain/template/helper/UserTemplate.Helper';
import { UserTemplate } from 'src/domain/template/domain/entity/UserTemplate';
import { UserApi } from 'src/domain/template/infrastructure/User.Api';

@Injectable()
export class TemplateNotifier
  implements
    TemplateHandler<[number, string, number], Promise<(GetCommentNotify | GetLikeNotify)[]>>
{
  operation: TemplateOperation = 'SEND_NOTIFY';

  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
  ) {}

  async handle(request: [number, string, number]): Promise<(GetCommentNotify | GetLikeNotify)[]> {
    const [userId, organization, challengeId] = request;
    const userChallengeAndAffiliationData =
      await this.userApi.requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(
        challengeId,
        userId,
        organization,
      );
    const userTemplateAndCommentAndLikeData =
      await this.userTemplateHelper.giveUserTemplateAndCommentAndLikeByUserChallengeId(
        userChallengeAndAffiliationData.getId(),
      );
    const hasNoData =
      !userTemplateAndCommentAndLikeData ||
      userTemplateAndCommentAndLikeData.length === 0 ||
      !userTemplateAndCommentAndLikeData.some(
        (item) => item.comments && item.comments.length > 0,
      ) ||
      !userTemplateAndCommentAndLikeData.some((item) => item.likes && item.likes.length > 0);
    return hasNoData
      ? []
      : this.proccessNotifyData(userTemplateAndCommentAndLikeData, userChallengeAndAffiliationData);
  }

  private async proccessNotifyData(
    userTemplateAndCommentAndLikeData: UserTemplate[],
    userChallengeAndAffiliationData: UserChallenge,
  ) {
    const extractAffiliationId = this.extractAffiliationIdAccordingToCommentAndLike(
      userTemplateAndCommentAndLikeData,
    );
    const [commentAffiliationData, likeAffiliationData] = await Promise.all([
      this.userApi.requestAffiliationById(extractAffiliationId.commentAffiliationIds),
      this.userApi.requestAffiliationById(extractAffiliationId.likeAffiliationIds),
    ]);
    const sortedComment = this.makeCommentShapeAccordingToUserTemplate(
      userTemplateAndCommentAndLikeData,
      userChallengeAndAffiliationData,
      commentAffiliationData,
    );
    const sortedLike = this.makeLikeShapeAccordingToUserTemplate(
      userTemplateAndCommentAndLikeData,
      userChallengeAndAffiliationData,
      likeAffiliationData,
    );
    const mergedCommentAndLike = this.mergeAndSortTimeCommentAndLike(sortedComment, sortedLike);
    return mergedCommentAndLike;
  }
  private extractAffiliationIdAccordingToCommentAndLike(userTemplate: UserTemplate[]) {
    const commentAffiliationIds: number[] = userTemplate.flatMap((userTemplate) =>
      userTemplate.comments.map((comment) => comment.getAffiliationId()),
    );
    const likeAffiliationIds: number[] = userTemplate.flatMap((userTemplate) =>
      userTemplate.likes.map((like) => like.getAffiliationId()),
    );
    return { commentAffiliationIds, likeAffiliationIds };
  }
  /**
   *
   * @param userTemplate 유저 챌린지에서 작성한 템플릿 데이터
   * @param userChallengeAndAffiliationData 유저 챌린지와 소속 데이터가 포함된 데이터
   * @returns 유저가 자신의 템플릿에 단 댓글이 제거된 데이터
   */
  private makeCommentShapeAccordingToUserTemplate(
    userTemplate: UserTemplate[],
    userChallengeAndAffiliationData: UserChallenge,
    affiliation: Affiliation[],
  ): GetCommentNotify[] {
    return userTemplate.flatMap((userTemplate) =>
      userTemplate.comments
        .filter(
          (comment) =>
            comment.getAffiliationId() !== userChallengeAndAffiliationData.affiliation.getId(),
        )
        .map((comment) => {
          const matchedAffiliation = affiliation.find(
            (affiliation) => affiliation.getId() === comment.getAffiliationId(),
          );
          return {
            commentId: comment.getId(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
            sign: comment.getCheck(),
            userTemplateId: userTemplate.getId(),
            templateName: userTemplate.getTemplateDate(),
            nickname: matchedAffiliation.getNickname(),
            type: 'comment',
          };
        }),
    );
  }
  private makeLikeShapeAccordingToUserTemplate(
    userTemplate: UserTemplate[],
    userChallengeAndAffiliationData: UserChallenge,
    affiliation: Affiliation[],
  ): GetLikeNotify[] {
    return userTemplate.flatMap((userTemplate) =>
      userTemplate.likes
        .filter(
          (like) => like.getAffiliationId() !== userChallengeAndAffiliationData.affiliation.getId(),
        )
        .map((like) => {
          const matchedAffiliation = affiliation.find(
            (affiliation) => affiliation.getId() === like.getAffiliationId(),
          );
          return {
            likeId: like.getId(),
            createdAt: like.getCreatedAt(),
            sign: like.getCheck(),
            userTemplateId: userTemplate.getId(),
            templateName: userTemplate.getTemplateDate(),
            nickname: matchedAffiliation.getNickname(),
            type: 'like',
          };
        }),
    );
  }
  private mergeAndSortTimeCommentAndLike(comments: GetCommentNotify[], likes: GetLikeNotify[]) {
    const mergedArray: (GetCommentNotify | GetLikeNotify)[] = [...comments, ...likes];
    mergedArray.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return mergedArray;
  }
}
