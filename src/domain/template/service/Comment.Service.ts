import { Injectable } from '@nestjs/common';
import { CommentHelper } from '../helper/Comment.Helper';
import { UserApi } from '../infrastructure/User.Api';
import { DataMapperService } from '../domain/service/DataMappper.Service';
import { MyComment } from '../dto/response/MyComment';
import { CommentId } from '../dto/response/CommentId';
import { Comment } from '../domain/entity/Comment';
import { Affiliation } from '../../../domain/user/domain/entity/Affiliation';
import { CommentInformation } from '../dto/response/CommentInformation';
import { sortCompanyPublic } from '../util/data';
import { formatDate, formatDateToPushAlarmStatus } from '../util/date';
import { checkData, compareValues } from '../util/checker';
import { CommentInsert } from '../dto/request/CommentInsert';
import { AlarmService } from '../../../global/alarm/Alarm.Service';
import { UserTemplateHelper } from '../helper/UserTemplate.Helper';
import { UserChallenge } from '../../../domain/user/domain/entity/UserChallenge';
import { ChallengeApi } from '../infrastructure/Challenge.Api';
import { Challenge } from '../../../domain/challenge/domain/entity/Challenge';
import { UserTemplate } from '../domain/entity/UserTemplate';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentHelper: CommentHelper,
    private readonly userApi: UserApi,
    private readonly dataMapperService: DataMapperService,
    private readonly alarmService: AlarmService,
    private readonly userTemplateHelper: UserTemplateHelper,
    private readonly challengeApi: ChallengeApi,
  ) {}

  public async bringMyComment(
    userId: number,
    organization: string,
    challengeId: number,
  ): Promise<MyComment[]> {
    const commentWriteAffiliationData =
      await this.userApi.requestAffiliationByUserIdAndOrganization(
        userId,
        organization,
      );
    const commentData =
      await this.commentHelper.giveCommentByAffiliationIdWithChallengeId(
        commentWriteAffiliationData.getAffiliationId(),
        challengeId,
      );
    return commentData.length === 0 ? [] : this.processCommentData(commentData);
  }

  private async processCommentData(
    commentData: Comment[],
  ): Promise<MyComment[]> {
    const userChallengeIdArray =
      this.dataMapperService.extractUserChallengeId(commentData);
    const templateWriteAffiliationData =
      await this.userApi.requestAffilaitonWithChallengeIdArray(
        userChallengeIdArray,
      );
    const myComment = this.makeMyCommentMapper(
      templateWriteAffiliationData,
      commentData,
    );
    return MyComment.of(myComment);
  }

  public makeMyCommentMapper(
    affiliationData: Affiliation[],
    commentData: Comment[],
  ) {
    return commentData.map((comment) => {
      const affiliation = affiliationData.find(
        (affiliation) =>
          affiliation.userChallenges[0].getId() ===
          comment.userTemplate.getUserChallengeId(),
      );
      if (checkData(affiliation)) {
        return new MyComment(
          comment.getId(),
          comment.getCreatedAt(),
          comment.getContent(),
          comment.userTemplate.getTemplateDate(),
          affiliation.getNickname(),
          comment.getUserTemplateId(),
        );
      }
    });
  }

  public async bringCommentInformation(
    userId: number,
    organization: string,
    userTemplateId: number,
  ): Promise<CommentWithReplies[] | []> {
    const commentDatas =
      await this.commentHelper.giveCommentByUserTemplateId(userTemplateId);
    return commentDatas.length === 0
      ? []
      : this.proccessCommentInformationData(userId, organization, commentDatas);
  }

  private async proccessCommentInformationData(
    userId: number,
    organization: string,
    commentDatas: Comment[],
  ) {
    const myAffiliationData =
      await this.userApi.requestAffiliationByUserIdAndOrganization(
        userId,
        organization,
      );
    const extractedAffiliationIds =
      this.dataMapperService.extractAffiliationId(commentDatas);
    // 검증 x
    const affiliationDatas = await this.userApi.requestAffiliationAndUserById(
      extractedAffiliationIds,
    );
    const mergedCommentInformation =
      this.mergeCommentAndAffiliationForCommentInformation(
        commentDatas,
        affiliationDatas,
        myAffiliationData,
      );
    const sortedCompanyData = sortCompanyPublic(
      mergedCommentInformation,
    ) as CommentInformation[];
    const customedCommentData = this.commentDataCustom(sortedCompanyData);
    return customedCommentData;
  }

  public async checkComment(commentId: number) {
    await this.commentHelper.executeUpdateCommentCheck(commentId);
  }

  public async penetrateComment(
    userId: number,
    commentInsert: CommentInsert,
  ): Promise<CommentId> {
    const [affiliationData, userTemplateData] = await Promise.all([
      this.userApi.requestAffiliationByUserIdAndOrganization(
        userId,
        commentInsert.getOrganization(),
      ),
      this.userTemplateHelper.findUserTemplateById(
        commentInsert.getUserTemplateId(),
      ),
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
    this.sendCommentNotification(
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
    CommentStatus: string,
    userChallengeData: UserChallenge,
    affiliationData: Affiliation,
    userTemplateData: UserTemplate,
    challengeData: Challenge,
  ) {
    if (CommentStatus === 'others') {
      this.alarmService.sendPushAlarm(
        userChallengeData
          .getAffiliation()
          .getUser()
          .getFirebaseTokens()
          .map((data) => data.getEngineValue()),
        `${challengeData.getName()} 챌린지 댓글 알림`,
        `${affiliationData.getNickname()}님이 ${formatDateToPushAlarmStatus(userTemplateData.getTemplateDate())} 템플릿에 댓글을 달았습니다.`,
      );
    }
  }

  public async modifyComment(
    userId: number,
    organization: string,
    commentId: number,
    content: string,
  ): Promise<void> {
    const affiliationData =
      await this.userApi.requestAffiliationByUserIdAndOrganization(
        userId,
        organization,
      );
    await this.commentHelper.executeUpdateComment(
      affiliationData.getAffiliationId(),
      commentId,
      content,
    );
  }

  public async eraseComment(
    userId: number,
    organization: string,
    commentId: number,
  ): Promise<void> {
    const affiliationData =
      await this.userApi.requestAffiliationByUserIdAndOrganization(
        userId,
        organization,
      );
    await this.commentHelper.executeDeleteComment(
      affiliationData.getAffiliationId(),
      commentId,
    );
  }

  private mergeCommentAndAffiliationForCommentInformation(
    commentDatas: Comment[],
    affiliationDatas: Affiliation[],
    myAffiliationData: Affiliation,
  ) {
    return commentDatas.map((commentData) => {
      const matchedAffiliationData = affiliationDatas.find(
        (affiliationData) =>
          affiliationData.getAffiliationId() === commentData.getAffiliationId(),
      );
      const myAffiliationId = Number(
        myAffiliationData.getAffiliationId() === commentData.getAffiliationId(),
      );
      return CommentInformation.of(
        matchedAffiliationData,
        commentData,
        this.commentDateFormat(String(commentData.getCreatedAt())),
        myAffiliationId,
      );
    });
  }

  private commentDataCustom = (
    commentData: CommentInformation[],
  ): CommentWithReplies[] => {
    const result: CommentWithReplies[] = [];
    commentData.forEach((comment: CommentInformation) => {
      const existingComment = this.findExistingComment(result, comment);
      if (existingComment) {
        this.addReplyToExistingComment(existingComment, comment);
      } else if (comment.getCommentGroup() === '-1') {
        const mainComment = this.createMainComment(comment);
        mainComment.reply = this.findRepliesForComment(commentData, comment);
        result.push(mainComment);
      }
    });
    return result;
  };

  private findExistingComment = (
    result: CommentWithReplies[],
    comment: CommentInformation,
  ): CommentWithReplies | undefined => {
    return result.find(
      (item) =>
        item.commentGroup === '-1' &&
        item.commentId === String(comment.getCommentId()),
    );
  };

  private addReplyToExistingComment = (
    existingComment: CommentWithReplies,
    comment: CommentInformation,
  ): void => {
    const reply = this.createCommentReply(comment);
    existingComment.reply.push(reply);
  };

  private createMainComment = (
    comment: CommentInformation,
  ): CommentWithReplies => {
    return {
      position: comment.getPosition(),
      company: comment.getCompany(),
      companyPublic: Number(comment.getCompanyPublic()),
      profile: comment.getProfile(),
      commentId: String(comment.getCommentId()),
      nickname: comment.getNickname(),
      commentGroup: comment.getCommentGroup(),
      userTempleteId: comment.getUserTempleteId(),
      myCommentSign: !!comment.getMyCommentSign(),
      content: comment.getContent(),
      createdAt: comment.getCreatedAt(),
      reply: [],
    };
  };

  private createCommentReply = (
    comment: CommentInformation,
  ): CommentWithReplies => {
    return {
      position: comment.getPosition(),
      company: comment.getCompany(),
      companyPublic: Number(comment.getCompanyPublic()),
      profile: comment.getProfile(),
      commentId: String(comment.getCommentId()),
      nickname: comment.getNickname(),
      commentGroup: comment.getCommentGroup(),
      userTempleteId: comment.getUserTempleteId(),
      myCommentSign: !!comment.getMyCommentSign(),
      content: comment.getContent(),
      createdAt: comment.getCreatedAt(),
      reply: [],
    };
  };

  private findRepliesForComment = (
    commentData: CommentInformation[],
    comment: CommentInformation,
  ): CommentWithReplies[] => {
    return commentData
      .filter(
        (reply) =>
          reply.getCommentGroup() !== '-1' &&
          reply.getCommentGroup() === String(comment.getCommentId()),
      )
      .map((reply) => this.createCommentReply(reply));
  };

  private commentDateFormat(date: string) {
    return formatDate(date);
  }
}
