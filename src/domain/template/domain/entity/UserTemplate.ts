import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Comment } from './Comment';
import { Likes } from './Likes';
import { QuestionContent } from './QuestionContent';
import { UserChallenge } from '../../../user/domain/entity/UserChallenge';
import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { InternalServerErrorException } from '@nestjs/common';

@Index('user_templates_user_challenges_fkey', ['userChallengeId'], {})
@Entity('user_templates')
export class UserTemplate extends BaseEntity {
  constructor(userChallengeId: number, templateDate: Date, complete: boolean) {
    super();
    this.setUserChallengeId(userChallengeId);
    this.setTemplateDate(templateDate);
    this.setComplete(complete);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'user_template_id' })
  userTemplateId: number;

  @Column('int', { name: 'user_challenge_id' })
  userChallengeId: number;

  @Column('date', { name: 'template_date', nullable: true })
  templateDate: Date | null;

  @Column('tinyint', { name: 'complete', nullable: true, width: 1 })
  complete: boolean | null;

  @OneToMany(() => Comment, (comment) => comment.userTemplate)
  comments: Relation<Comment>[];

  @OneToMany(() => Likes, (likes) => likes.userTemplate)
  likes: Relation<Likes>[];

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.userTemplate,
  )
  questionContents: Relation<QuestionContent>[];

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.userTemplates,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'user_challenge_id', referencedColumnName: 'userChallengeId' },
  ])
  userChallenge: Relation<UserChallenge>;

  public static createUserTemplate(
    userChallengeId: number,
    finished_at: Date,
    complete: boolean,
  ) {
    return new UserTemplate(userChallengeId, finished_at, complete);
  }

  private setUserChallengeId(userChallengeId: number) {
    if (userChallengeId === null)
      throw new InternalServerErrorException(
        `${__dirname} : userChallengeId 값이 존재하지 않습니다.`,
      );
    this.userChallengeId = userChallengeId;
  }

  private setTemplateDate(templateDate: Date) {
    if (templateDate === null)
      throw new InternalServerErrorException(
        `${__dirname} : templateDate 값이 존재하지 않습니다.`,
      );
    this.templateDate = templateDate;
  }

  private setComplete(complete: boolean) {
    if (complete === null)
      throw new InternalServerErrorException(
        `${__dirname} : complete값이 존재하지 않습니다.`,
      );
    this.complete = complete;
  }

  public getId() {
    return this.userTemplateId;
  }

  public getTemplateDate(): Date {
    return this.templateDate;
  }

  public getComplete(): boolean {
    return this.complete;
  }

  public getUserChallengeId() {
    return this.userChallengeId;
  }

  public getQuestionContents() {
    return this.questionContents;
  }

  public getLikes() {
    return this.likes;
  }

  public getComments() {
    return this.comments;
  }

  public getCreatedAt() {
    return this.createdAt;
  }
}
