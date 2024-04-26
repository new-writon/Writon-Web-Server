import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Challenge } from "./Challenge.js";
import { QuestionContent } from "../../../template/domain/entity/QuestionContent.js";
import { QuestionTag } from "./QuestionTag.js";

@Index("Question_challenge_id_fkey", ["challengeId"], {})
@Entity("Question", { schema: "nest" })
export class Question {
  @PrimaryGeneratedColumn({ type: "int", name: "question_id" })
  questionId: number;

  @Column("int", { name: "challenge_id" })
  challengeId: number;

  @Column("varchar", { name: "question", length: 255 })
  question: string;

  @Column("varchar", { name: "category", length: 10 })
  category: string;

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

  @ManyToOne(() => Challenge, (challenge) => challenge.questions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Challenge;

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.question
  )
  questionContents: QuestionContent[];

  @OneToMany(() => QuestionTag, (questionTag) => questionTag.question)
  questionTags: QuestionTag[];
}
