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
import { UserTemplete } from "./UserTemplete.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";
import { InternalServerErrorException } from "@nestjs/common";


@Index("QuestionContent_question_content_id_key", ["question_content_id"], {
  unique: true,
})
@Index("QuestionContent_question_id_fkey", ["question_id"], {})
@Index("QuestionContent_user_templete_id_fkey", ["user_templete_id"], {})
@Entity("QuestionContent", { schema: "nest" })
export class QuestionContent extends BaseEntity{


  constructor(
    question_id: number,
    content: string,
    visibility: boolean,
    user_templete_id: number
  ){
    super(),
    this.setQuestionId(question_id);
    this.setContent(content);
    this.setVisibility(visibility);
    this.setUserTemplateId(user_templete_id);
  }

  @PrimaryGeneratedColumn({ type: "int", name: "question_content_id" })
  question_content_id: number;

  @Column("int", { primary: true, name: "question_id" })
  question_id: number;

  @Column("int", { primary: true, name: "user_templete_id" })
  user_templete_id: number;

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
    () => UserTemplete,
    (userTemplete) => userTemplete.questionContents,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_templete_id", referencedColumnName: "user_templete_id" },
  ])
  userTemplete: Relation<UserTemplete>;

  public getId (){
    return this.question_content_id;
  }


  public static createQuestionContent(    
    question_id: number,
    content: string,
    visibility: boolean,
    user_templete_id: number){
      return new QuestionContent(question_id, content, visibility, user_templete_id);
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
    this.user_templete_id=userTemplateId
  }
}
