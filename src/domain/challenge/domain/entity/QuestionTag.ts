import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Question } from "./Question.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";


@Index("QuestionTag_question_id_fkey", ["questionId"], {})
@Entity("QuestionTag", { schema: "nest" })
export class QuestionTag {
  @PrimaryGeneratedColumn({ type: "int", name: "question_tag_id" })
  questionTagId: number;

  @Column("int", { name: "question_id" })
  questionId: number;

  @Column("varchar", { name: "category", length: 10 })
  category: string;

  @ManyToOne(() => Question, (question) => question.questionTags, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "questionId" }])
  question: Relation<Question>;
}
