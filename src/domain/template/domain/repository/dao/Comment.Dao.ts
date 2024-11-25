import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CommentRepository } from '../Comment.Repository';
import { Comment } from '../../entity/Comment';
import { UserChallenge } from '../../../../user/domain/entity/UserChallenge';

@Injectable()
export class CommentDao
  extends Repository<Comment>
  implements CommentRepository
{
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findCommentByAffiliationIdWithChallengeId(
    affiliationId: number,
    challengeId: number,
  ): Promise<Comment[]> {
    return this.dataSource
      .createQueryBuilder(Comment, 'c')
      .innerJoinAndSelect('c.userTemplate', 'ut')
      .innerJoin(
        UserChallenge,
        'uc',
        'uc.user_challenge_id = ut.user_challenge_id',
      )
      .where('c.affiliation_id = :affiliationId', { affiliationId })
      .andWhere('uc.challenge_id = :challengeId', { challengeId })
      .orderBy('c.createdAt', 'DESC')
      .getMany();
  }

  async updateCommentCheck(commentId: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(Comment)
      .set({
        check: true,
      })
      .where('comment_id = :commentId', { commentId })
      .execute();
  }

  async findCommentWithUserIdAndOrganizationAndChallengeId() // userId: number,
  // organization: string,
  // challengeId: number,
  : Promise<Comment[]> {
    return this.dataSource
      .createQueryBuilder(Comment, 'c')
      .innerJoinAndSelect(
        'c.userTemplate',
        'ut',
        'ut.user_template_id = c.user_template_id',
      )
      .getMany();
  }

  async insertComment(
    affiliationId: number,
    content: string,
    userTemplateId: number,
    commentGroup: number,
  ): Promise<Comment> {
    const newComment = Comment.createComment(
      affiliationId,
      content,
      userTemplateId,
      commentGroup,
    );
    return this.save(newComment);
  }

  async updateComment(
    affilationId: number,
    commentId: number,
    content: string,
  ): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(Comment)
      .set({
        content: content,
      })
      .where('affiliation_id = :affilationId', { affilationId })
      .andWhere('comment_id = :commentId', { commentId })
      .execute();
  }

  async deleteComment(affiliationId: number, commentId: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .where('comment_id = :commentId', { commentId })
      .andWhere('affiliation_id = :affiliationId', { affiliationId })
      .execute();
  }

  async findCommentById(commentId: number): Promise<Comment> {
    return this.dataSource
      .createQueryBuilder()
      .select('c')
      .from(Comment, 'c')
      .where('c.comment_id = :commentId', { commentId })
      .getOne();
  }

  async findCommentByUserTemplateId(
    userTemplateId: number,
  ): Promise<Comment[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('c')
      .from(Comment, 'c')
      .where('c.user_template_id = :userTemplateId', { userTemplateId })
      .orderBy('c.comment_group', 'ASC')
      .addOrderBy('c.comment_id', 'ASC')
      .getMany();
  }
}
