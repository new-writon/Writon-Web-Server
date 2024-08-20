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
import { Challenge } from "./Challenge";
import { QuestionContent } from "../../../template/domain/entity/QuestionContent";
import { Keyword } from "./Keyword";
import { BaseEntity } from "../../../../global/entity/base.entitiy";


@Index("questions_challenges_fkey", ["challengeId"], {})
@Index("questions_keywords_fkey", ["keywordId"], {})
@Entity("questions", { schema: "nest" })
export class Question extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "question_id" })
  questionId: number;

  @Column("int", { name: "challenge_id" })
  challengeId: number;

  @Column("varchar", { name: "question", length: 255 })
  question: string;

  @Column("varchar", { name: "category", length: 10 })
  category: string;

  @Column("int", { name: "keyword_id" })
  keywordId: number;

  @ManyToOne(() => Challenge, (challenge) => challenge.questions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Relation<Challenge>;

  @ManyToOne(() => Keyword, (keyword) => keyword.questions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "keyword_id", referencedColumnName: "keywordId" }])
  keyword: Relation<Keyword>;

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.question
  )
  questionContents: Relation<QuestionContent>[];

  // @OneToMany(() => Keyword, (keywords) => keywords.question)
  // keywords: Relation<Keyword>[];

  public getId(){
    return this.questionId;
  }

  public getCategory(){
    return this.category;
  }

  public getQuestion(){
    return this.question;
  }
}
