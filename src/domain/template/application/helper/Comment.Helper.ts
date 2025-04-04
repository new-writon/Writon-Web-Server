import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/domain/template/application/port/output/Comment.Repository';
import { TemplateVerifyService } from 'src/global/exception/template/TemplateVerify.Service';
import { Comment } from 'src/domain/template/domain/entity/Comment';

@Injectable()
export class CommentHelper {
  constructor(
    @Inject('commentImpl')
    private readonly commentRepository: CommentRepository,
    private readonly templateVerifyService: TemplateVerifyService,
  ) {}

  public async giveCommentByAffiliationIdWithChallengeId(
    affilationId: number,
    challengeId: number,
  ): Promise<Comment[]> {
    return this.commentRepository.findCommentByAffiliationIdWithChallengeId(
      affilationId,
      challengeId,
    );
  }

  public async executeUpdateCommentCheck(commentId: number): Promise<void> {
    return this.commentRepository.updateCommentCheck(commentId);
  }

  public async giveCommentWithUserIdAndOrganizationAndChallengeId(
    userId: number,
    organization: string,
    challengeId: number,
  ): Promise<Comment[]> {
    return this.commentRepository.findCommentWithUserIdAndOrganizationAndChallengeId(
      userId,
      organization,
      challengeId,
    );
  }

  public async giveCommentById(commentId: number): Promise<Comment> {
    return this.commentRepository.findCommentById(commentId);
  }

  public async executeInsertComment(
    affiliationId: number,
    content: string,
    userTemplateId: number,
    commentGroup: number,
  ): Promise<Comment> {
    return this.commentRepository.insertComment(
      affiliationId,
      content,
      userTemplateId,
      commentGroup,
    );
  }

  public async executeUpdateComment(
    affilationId: number,
    commentId: number,
    content: string,
  ): Promise<void> {
    const commentData = await this.commentRepository.findCommentById(commentId);
    this.templateVerifyService.verifyComment(commentData);
    return this.commentRepository.updateComment(affilationId, commentId, content);
  }

  public async executeDeleteComment(affilationId: number, commentId: number): Promise<void> {
    const commentData = await this.commentRepository.findCommentById(commentId);
    this.templateVerifyService.verifyComment(commentData);
    return this.commentRepository.deleteComment(affilationId, commentId);
  }

  public async giveCommentByUserTemplateId(userTemplateId: number): Promise<Comment[]> {
    return this.commentRepository.findCommentByUserTemplateId(userTemplateId);
  }
}
