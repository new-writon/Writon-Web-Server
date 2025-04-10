import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Affiliation } from '../../../user/domain/entity/Affiliation';
import { UserTemplate } from './UserTemplate';
import { BaseEntity } from '../../../../global/entity/base.entitiy';

@Index('comments_user_templates_fkeyComment_user_template_id_fkey', ['userTemplateId'], {})
@Index('comments_affiliations_fkey', ['affiliationId'], {})
@Entity('comments')
export class Comment extends BaseEntity {
  constructor(
    affiliationId: number,
    content: string,
    userTemplateId: number,
    commentGroup: number,
  ) {
    super();
    this.setAffiliation(affiliationId);
    this.setContent(content);
    this.setUserTemplateId(userTemplateId);
    this.setCommentGroup(commentGroup);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'comment_id' })
  commentId: number;

  @Column('int', { name: 'comment_group', nullable: true })
  commentGroup: number | null;

  @Column('int', { name: 'user_template_id' })
  userTemplateId: number;

  @Column('int', { name: 'affiliation_id' })
  affiliationId: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('tinyint', { name: 'check', nullable: true })
  check: number | null;

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'affiliation_id', referencedColumnName: 'affiliationId' }])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => UserTemplate, (userTemplate) => userTemplate.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_template_id', referencedColumnName: 'userTemplateId' }])
  userTemplate: Relation<UserTemplate>;

  public static createComment(
    affiliationId: number,
    content: string,
    userTemplateId: number,
    commentGroup: number,
  ) {
    return new Comment(affiliationId, content, userTemplateId, commentGroup);
  }

  public getUserTemplateId() {
    return this.userTemplateId;
  }

  public getId() {
    return this.commentId;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getContent() {
    return this.content;
  }

  public getAffiliationId() {
    return this.affiliationId;
  }

  public getCheck() {
    return this.check;
  }

  public getCommentGroup() {
    return this.commentGroup;
  }

  private setAffiliation(affiliationId: number) {
    this.affiliationId = affiliationId;
  }

  private setContent(content: string) {
    this.content = content;
  }

  private setUserTemplateId(userTemplateId: number) {
    this.userTemplateId = userTemplateId;
  }

  private setCommentGroup(commentGroup: number) {
    this.commentGroup = commentGroup;
  }
}
