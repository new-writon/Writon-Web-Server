import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { CommentInsert } from '../../dto/request/CommentInsert';
import { CommentId } from '../../dto/response/CommentId';
import { UserApi } from '../../infrastructure/User.Api';
import { UserTemplateHelper } from '../../helper/UserTemplate.Helper';
import { checkFirebaseToken, compareValues } from '../../util/checker';
import { ChallengeApi } from '../../infrastructure/Challenge.Api';
import { CommentHelper } from '../../helper/Comment.Helper';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { UserTemplate } from '../../domain/entity/UserTemplate';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { AlarmService } from 'src/global/alarm/Alarm.Service';
import { formatDateToPushAlarmStatus } from '../../util/date';
import { TemplateOperation } from '../types/Operation';

@Injectable()
export class CommentRegistrant
  implements TemplateHandler<[CommentInsert, number], Promise<CommentId>>
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
    const [affiliationData, userTemplateData] = await Promise.all([
      this.userApi.requestAffiliationByUserIdAndOrganization(
        userId,
        commentInsert.getOrganization(),
      ),
      this.userTemplateHelper.findUserTemplateById(commentInsert.getUserTemplateId()),
    ]);
    const userChallengeData =
      await this.userApi.requestUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
        userTemplateData.getUserChallengeId(),
      );
    const challengeData = await this.challengeApi.requestChallengeById(
      userChallengeData.getChallengeId(),
    );
    const myCommentCheck = compareValues(
      affiliationData.getId(),
      userChallengeData.getAffiliation().getId(),
    );
    const firebaseTokenCheckingResult = checkFirebaseToken(userChallengeData);
    this.sendCommentNotification(
      firebaseTokenCheckingResult,
      myCommentCheck,
      userChallengeData,
      affiliationData,
      userTemplateData,
      challengeData,
    );
    const commentData = await this.commentHelper.executeInsertComment(
      affiliationData.getAffiliationId(),
      commentInsert.getContent(),
      commentInsert.getUserTemplateId(),
      commentInsert.getCommentGroup(),
    );
    return CommentId.of(commentData.getId());
  }

  private sendCommentNotification(
    firebaseTokenChecking: boolean,
    CommentStatus: string,
    userChallengeData: UserChallenge,
    affiliationData: Affiliation,
    userTemplateData: UserTemplate,
    challengeData: Challenge,
  ) {
    if (CommentStatus === 'others' && firebaseTokenChecking) {
      this.alarmService.sendPushAlarm(
        userChallengeData.getAffiliation().getUser().getId(),
        userChallengeData
          .getAffiliation()
          .getUser()
          .getFirebaseTokens()
          .map((data) => data.getEngineValue()),
        `${challengeData.getName()} 챌린지 댓글 알림`,
        `${affiliationData.getNickname()}님이 ${formatDateToPushAlarmStatus(userTemplateData.getTemplateDate())} 템플릿에 댓글을 달았습니다.`,
        `/detail/${userTemplateData.getId()}`,
      );
    }
  }
}
