import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { CommentHelper } from '../../../helper/Comment.Helper';
import { UserApi } from '../../../infrastructure/User.Api';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { Comment } from '../../../domain/entity/Comment';
import { sortCompanyPublic } from '../../../util/data';
import { CommentInformation } from '../../../dto/response/CommentInformation';
import { formatDate } from '../../../util/date';
import { TemplateOperation } from '../../types/Operation';

@Injectable()
export class TemplateCommentCollector
  implements TemplateHandler<[string, number, number], Promise<CommentWithReplies[]>>
{
  operation: TemplateOperation = 'SELECT_TEMPLATE_COMMENT';
  constructor(
    private readonly commentHelper: CommentHelper,
    private readonly userApi: UserApi,
    private readonly dataMapperService: DataMapperService,
  ) {}
  async handle(request: [string, number, number]): Promise<CommentWithReplies[]> {
    const [organization, userTemplateId, userId] = request;
    const commentDatas = await this.commentHelper.giveCommentByUserTemplateId(userTemplateId);
    return commentDatas.length === 0
      ? []
      : this.proccessCommentInformationData(userId, organization, commentDatas);
  }
  private async proccessCommentInformationData(
    userId: number,
    organization: string,
    commentDatas: Comment[],
  ) {
    const myAffiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(
      userId,
      organization,
    );
    const extractedAffiliationIds = this.dataMapperService.extractAffiliationId(commentDatas);
    const affiliationDatas =
      await this.userApi.requestAffiliationAndUserById(extractedAffiliationIds);
    const mergedCommentInformation = this.mergeCommentAndAffiliationForCommentInformation(
      commentDatas,
      affiliationDatas,
      myAffiliationData,
    );
    const sortedCompanyData = sortCompanyPublic(mergedCommentInformation) as CommentInformation[];
    const customedCommentData = this.commentDataCustom(sortedCompanyData);
    return customedCommentData;
  }

  private mergeCommentAndAffiliationForCommentInformation(
    commentDatas: Comment[],
    affiliationDatas: Affiliation[],
    myAffiliationData: Affiliation,
  ) {
    return commentDatas.map((commentData) => {
      const matchedAffiliationData = affiliationDatas.find(
        (affiliationData) => affiliationData.getAffiliationId() === commentData.getAffiliationId(),
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

  private commentDataCustom = (commentData: CommentInformation[]): CommentWithReplies[] => {
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
      (item) => item.commentGroup === '-1' && item.commentId === String(comment.getCommentId()),
    );
  };

  private addReplyToExistingComment = (
    existingComment: CommentWithReplies,
    comment: CommentInformation,
  ): void => {
    const reply = this.createCommentReply(comment);
    existingComment.reply.push(reply);
  };

  private createMainComment = (comment: CommentInformation): CommentWithReplies => {
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

  private createCommentReply = (comment: CommentInformation): CommentWithReplies => {
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
