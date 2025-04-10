import { Repository } from 'typeorm';
import { Comment } from 'src/domain/template/domain/entity/Comment';

export interface CommentRepository extends Repository<Comment> {
  findCommentByAffiliationIdWithChallengeId(
    affiliationId: number,
    challengeId: number,
  ): Promise<Comment[]>;
  updateCommentCheck(commentId: number): Promise<void>;
  findCommentById(commentId: number): Promise<Comment>;
  findCommentWithUserIdAndOrganizationAndChallengeId(
    userId: number,
    organization: string,
    challengeId: number,
  ): Promise<Comment[]>;
  insertComment(
    affiliationId: number,
    content: string,
    userTemplateId: number,
    commentGroup: number,
  ): Promise<Comment>;
  updateComment(affilationId: number, commentId: number, content: string): Promise<void>;
  deleteComment(affilationId: number, commentId: number): Promise<void>;
  findCommentByUserTemplateId(userTemplateId: number): Promise<Comment[]>;
}
