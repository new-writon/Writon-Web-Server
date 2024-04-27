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
import { QuestionTag } from "./QuestionTag.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";


@Index("Question_challenge_id_fkey", ["challengeId"], {})
@Entity("Question", { schema: "nest" })
export class Question extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "question_id" })
  questionId: number;

  @Column("int", { name: "challenge_id" })
  challengeId: number;

  @Column("varchar", { name: "question", length: 255 })
  question: string;

  @Column("varchar", { name: "category", length: 10 })
  category: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.questions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Relation<Challenge>;

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.question
  )
  questionContents: Relation<QuestionContent>[];

  @OneToMany(() => QuestionTag, (questionTag) => questionTag.question)
  questionTags: Relation<QuestionTag>[];
}
