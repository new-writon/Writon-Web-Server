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


@Index("QuestionContent_question_content_id_key", ["question_content_id"], {
  unique: true,
})
@Index("QuestionContent_question_id_fkey", ["question_id"], {})
@Index("QuestionContent_user_templete_id_fkey", ["user_templete_id"], {})
@Entity("QuestionContent", { schema: "nest" })
export class QuestionContent extends BaseEntity{
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
}
