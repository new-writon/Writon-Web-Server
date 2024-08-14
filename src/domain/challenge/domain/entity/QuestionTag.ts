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
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Index("QuestionTag_question_id_fkey", ["question_id"], {})
@Entity("question_tag", { schema: "nest" })
export class QuestionTag {
  @PrimaryGeneratedColumn({ type: "int", name: "question_tag_id" })
  question_tag_id: number;

  @Column("int", { name: "question_id" })
  question_id: number;

  @Column("varchar", { name: "category", length: 10 })
  category: string;

  @ManyToOne(() => Question, (question) => question.questionTags, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "question_id" }])
  question: Relation<Question>;
}
