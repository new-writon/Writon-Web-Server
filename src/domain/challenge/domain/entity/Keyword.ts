import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Question } from "./Question.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//@Index("QuestionTag_question_id_fkey", ["question_id"], {})
@Entity("keyword", { schema: "nest" })
export class Keyword {
  @PrimaryGeneratedColumn({ type: "int", name: "keyword_id" })
  keywordId: number;

  // @Column("int", { name: "question_id" })
  // questionId: number;

  @Column("varchar", { name: "keyword", length: 10 })
  keyword: string;

  @OneToMany(() => Question, (questions) => questions.keyword)
  questions: Relation<Question>[];

  // @ManyToOne(() => Question, (question) => question.keywords, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // @JoinColumn([{ name: "question_id", referencedColumnName: "question_id" }])
  // question: Relation<Question>;
}
