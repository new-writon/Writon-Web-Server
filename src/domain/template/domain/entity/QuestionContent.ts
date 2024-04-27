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

@Index("QuestionContent_question_content_id_key", ["questionContentId"], {
  unique: true,
})
@Index("QuestionContent_question_id_fkey", ["questionId"], {})
@Index("QuestionContent_user_templete_id_fkey", ["userTempleteId"], {})
@Entity("QuestionContent", { schema: "nest" })
export class QuestionContent {
  @PrimaryGeneratedColumn({ type: "int", name: "question_content_id" })
  questionContentId: number;

  @Column("int", { primary: true, name: "question_id" })
  questionId: number;

  @Column("int", { primary: true, name: "user_templete_id" })
  userTempleteId: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("tinyint", { name: "visibility", width: 1 })
  visibility: boolean;

  @Column("timestamp", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "update_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updateAt: Date;

  @ManyToOne(() => Question, (question) => question.questionContents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "questionId" }])
  question: Relation<Question>;

  @ManyToOne(
    () => UserTemplete,
    (userTemplete) => userTemplete.questionContents,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_templete_id", referencedColumnName: "userTempleteId" },
  ])
  userTemplete: Relation<UserTemplete>;
}
