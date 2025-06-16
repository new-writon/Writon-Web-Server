import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UserTemplate } from './UserTemplate';
import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { InternalServerErrorException } from '@nestjs/common';

@Index('question_contents_user_templates_fkey', ['userTemplateId'], {})
@Entity('default_question_contents', { schema: 'nest' })
export class DefaultQuestionContent extends BaseEntity {
  constructor(questionId: number, content: string, visibility: boolean, userTemplateId: number) {
    super(), this.setQuestionId(questionId);
    this.setContent(content);
    this.setVisibility(visibility);
    this.setUserTemplateId(userTemplateId);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'default_question_content_id' })
  defaultQuestionContentId: number;

  @Column('int', { name: 'question_id' })
  questionId: number;

  @Column('int', { name: 'user_template_id' })
  userTemplateId: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('tinyint', { name: 'visibility', width: 1 })
  visibility: boolean;

  @ManyToOne(() => UserTemplate, (userTemplate) => userTemplate.questionContents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_template_id', referencedColumnName: 'userTemplateId' }])
  userTemplate: Relation<UserTemplate>;

  public getId() {
    return this.defaultQuestionContentId;
  }

  public getQuestionId() {
    return this.questionId;
  }

  public getContent() {
    return this.content;
  }

  public getVisibility() {
    return this.visibility;
  }

  public static createDefaultQuestionContent(
    questionId: number,
    content: string,
    visibility: boolean,
    userTemplateId: number,
  ) {
    return new DefaultQuestionContent(questionId, content, visibility, userTemplateId);
  }

  private setQuestionId(questionId: number) {
    if (questionId === null) {
      throw new InternalServerErrorException(`${__dirname} : questionId값이 존재하지 않습니다.`);
    }
    this.questionId = questionId;
  }

  private setContent(content: string) {
    if (content === null) {
      throw new InternalServerErrorException(`${__dirname} : content값이 존재하지 않습니다.`);
    }
    this.content = content;
  }

  private setVisibility(visibility: boolean) {
    if (visibility === null) {
      throw new InternalServerErrorException(`${__dirname} : visibility값이 존재하지 않습니다.`);
    }
    this.visibility = visibility;
  }

  private setUserTemplateId(userTemplateId: number) {
    if (userTemplateId === null) {
      throw new InternalServerErrorException(
        `${__dirname} : userTemplateId 값이 존재하지 않습니다.`,
      );
    }
    this.userTemplateId = userTemplateId;
  }
}
