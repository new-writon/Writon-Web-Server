import { Injectable } from '@nestjs/common';
import { CommentInsert } from '../../../dto/request/CommentInsert';
import { CommentId } from '../../../dto/response/CommentId';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { UserTemplate } from '../../../domain/entity/UserTemplate';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { AlarmService } from 'src/global/alarm/Alarm.Service';
import { formatDateToPushAlarmStatus } from '../../../util/date';
import { TemplateOperation } from '../types/Operation';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';
import { CommentHelper } from 'src/domain/template/application/helper/Comment.Helper';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { ChallengeApi } from 'src/domain/template/application/apis/Challenge.Api';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';
import { Comment } from '../../../domain/entity/Comment';

@Injectable()
export class CommentRegistrant
  implements TemplateUseCase<[CommentInsert, number], Promise<CommentId>>
{
  operation: TemplateOperation = 'INSERT_COMMENT';

  constructor(
    private readonly userApi: UserApi,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly challengeApi: ChallengeApi,
    private readonly commentHelper: CommentHelper,
    private readonly alarmService: AlarmService,
  ) {}

  async handle(request: [CommentInsert, number]): Promise<CommentId> {
    const [commentInsert, userId] = request;

    const [affiliationData, userTemplateData, comments] = await Promise.all([
      this.userApi.requestAffiliationByUserIdAndOrganization(
        userId,
        commentInsert.getOrganization(),
      ),
      this.userTemplateHelper.findUserTemplateById(commentInsert.getUserTemplateId()),
      this.commentHelper.giveCommentByUserTemplateId(commentInsert.getUserTemplateId()),
    ]);

    const userChallengeData =
      await this.userApi.requestUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
        userTemplateData.getUserChallengeId(),
      );
    const challengeData = await this.challengeApi.requestChallengeById(
      userChallengeData.getChallengeId(),
    );
    const commentData = await this.commentHelper.executeInsertComment(
      affiliationData.getAffiliationId(),
      commentInsert.getContent(),
      commentInsert.getUserTemplateId(),
      commentInsert.getCommentGroup(),
    );
    await this.sendNotification({
      comments,
      affiliationData,
      userChallengeData,
      challengeData,
      userTemplateData,
    });
    return CommentId.of(commentData.getId());
  }

  private async sendNotification(params: {
    comments: Comment[];
    affiliationData: Affiliation;
    userChallengeData: UserChallenge;
    challengeData: Challenge;
    userTemplateData: UserTemplate;
  }) {
    const { comments, affiliationData, userChallengeData, challengeData, userTemplateData } =
      params;

    const myAffiliationId = affiliationData.getAffiliationId();
    const templateOwnerAffiliationId = userChallengeData.getAffiliation().getAffiliationId();

    // 1. 템플릿 주인에게 알림 (본인이 아닐 경우)
    if (myAffiliationId !== templateOwnerAffiliationId) {
      const firebaseTokens = userChallengeData
        .getAffiliation()
        .getUser()
        .getFirebaseTokens()
        .map((token) => token.getEngineValue());

      if (firebaseTokens.length > 0) {
        await this.alarmService.sendPushAlarm(
          userChallengeData.getAffiliation().getUser().getId(),
          firebaseTokens,
          `${challengeData.getName()} 챌린지 댓글 알림`,
          `${affiliationData.getNickname()}님이 ${formatDateToPushAlarmStatus(userTemplateData.getTemplateDate())} 템플릿에 댓글을 달았습니다.`,
          `/detail/${userTemplateData.getId()}`,
        );
      }
    }

    // 2. 댓글 그룹 참여자에게 알림
    const targetAffiliationIds = [
      ...new Set(
        comments
          .map((comment) => comment.getAffiliationId())
          .filter((id) => id !== myAffiliationId && id !== templateOwnerAffiliationId),
      ),
    ];
    for (const affiliationId of targetAffiliationIds) {
      const targetAffiliation =
        await this.userApi.requestAffiliationAndUserAndFirebaseTokenByAffiliationId(affiliationId);
      const firebaseTokens = targetAffiliation
        .getUser()
        .getFirebaseTokens()
        .map((token) => token.getEngineValue());

      if (firebaseTokens.length === 0) {
        continue;
      }

      await this.alarmService.sendPushAlarm(
        targetAffiliation.getUser().getId(),
        firebaseTokens,
        `${challengeData.getName()} 챌린지 댓글 알림`,
        `${affiliationData.getNickname()}님이 ${formatDateToPushAlarmStatus(userTemplateData.getTemplateDate())} 템플릿 댓글에 답글을 남겼습니다.`,
        `/detail/${userTemplateData.getId()}`,
      );
    }
  }
}
