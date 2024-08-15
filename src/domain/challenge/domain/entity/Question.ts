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
import { Challenge } from "./Challenge.js";
import { QuestionContent } from "../../../template/domain/entity/QuestionContent.js";
import { Keyword } from "./Keyword.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Index("Question_challenge_id_fkey", ["challenge_id"], {})
@Entity("questions", { schema: "nest" })
export class Question extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "question_id" })
  question_id: number;

  @Column("int", { name: "challenge_id" })
  challenge_id: number;

  @Column("varchar", { name: "question", length: 255 })
  question: string;

  @Column("varchar", { name: "category", length: 10 })
  category: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.questions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challenge_id" }])
  challenge: Relation<Challenge>;

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.question
  )
  questionContents: Relation<QuestionContent>[];

  @OneToMany(() => Keyword, (keywords) => keywords.question)
  keywords: Relation<Keyword>[];

  public getId(){
    return this.question_id;
  }

  public getCategory(){
    return this.category;
  }

  public getQuestion(){
    return this.question;
  }
}
