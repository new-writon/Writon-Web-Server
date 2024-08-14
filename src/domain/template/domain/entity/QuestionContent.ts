import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Question } from "../../../challenge/domain/entity/Question.js";
import { UserTemplate } from "./UserTemplate.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



@Index("QuestionContent_question_content_id_key", ["question_content_id"], {
  unique: true,
})
@Index("QuestionContent_question_id_fkey", ["question_id"], {})
@Index("QuestionContent_user_template_id_fkey", ["user_template_id"], {})
@Entity("question_contents", { schema: "nest" })
export class QuestionContent extends BaseEntity{


  constructor(
    question_id: number,
    content: string,
    visibility: boolean,
    user_template_id: number
  ){
    super(),
    this.setQuestionId(question_id);
    this.setContent(content);
    this.setVisibility(visibility);
    this.setUserTemplateId(user_template_id);
  }

  @PrimaryGeneratedColumn({ type: "int", name: "question_content_id" })
  question_content_id: number;

  @Column("int", { name: "question_id" })
  question_id: number;

  @Column("int", { name: "user_template_id" })
  user_template_id: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("tinyint", { name: "visibility", width: 1 })
  visibility: boolean;

  @ManyToOne(() => Question, (question) => question.questionContents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "question_id" }])
  question: Relation<Question>;

  @ManyToOne(
    () => UserTemplate,
    (userTemplate) => userTemplate.questionContents,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_template_id", referencedColumnName: "user_template_id" },
  ])
  userTemplate: Relation<UserTemplate>;

  public getId (){
    return this.question_content_id;
  }

  public getQuestionId(){
    return this.question_id;
  }

  public getContent(){
    return this.content;
  }

  public getVisibility(){
    return this.visibility
  }


  public static createQuestionContent(    
    question_id: number,
    content: string,
    visibility: boolean,
    user_template_id: number){
      return new QuestionContent(question_id, content, visibility, user_template_id);
    }

  private setQuestionId(questionId: number){
    if(questionId === null) throw new InternalServerErrorException (`${__dirname} : questionId값이 존재하지 않습니다.`);
    this.question_id=questionId
  }

  private setContent(content:string){
    if(content === null) throw new InternalServerErrorException (`${__dirname} : content값이 존재하지 않습니다.`);
    this.content=content
  }

  private setVisibility(visibility:boolean){
    if(visibility === null) throw new InternalServerErrorException (`${__dirname} : visibility값이 존재하지 않습니다.`);
    this.visibility=visibility;
  }

  private setUserTemplateId(userTemplateId:number){
    if(userTemplateId=== null) throw new InternalServerErrorException (`${__dirname} : userTemplateId 값이 존재하지 않습니다.`);
    this.user_template_id=userTemplateId
  }
}
