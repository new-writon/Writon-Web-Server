import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { SmallTalk} from "../../../smalltalk/domain/entity/SmallTalk.js";
import { ChallengeDay } from "./ChallengeDay.js";
import { ChallengeDepositDeduction } from "./ChallengeDepositDeduction.js";
import { Question } from "./Question.js";
import { Satisfaction } from "../../../satisfaction/domain/entity/Satisfaction.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Index("Challenge_challenge_id_key", ["challenge_id"], { unique: true })
@Index("Challenge_affiliation_id_fkey", ["affiliation_id"], {})
@Entity("challenges", { schema: "nest" })
export class Challenge extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "challenge_id" })
  challenge_id: number;

  @Column("int", { name: "affiliation_id" })
  affiliation_id: number;

  @Column("varchar", { name: "name", length: 40 })
  name: string;

  @Column("date", { name: "start_at" })
  start_at: string;

  @Column("date", { name: "finish_at" })
  finish_at: string;

  @Column("int", { name: "deposit" })
  deposit: number;

  @Column("longtext", { name: "refund_conditions", nullable: true })
  refund_conditions: string | null;

  @Column("longtext", { name: "review_url", nullable: true })
  review_url: string | null;

  @Column("tinyint", { name: "restart", nullable: true })
  restart: number | null;

  @OneToMany(() => ChallengeDay, (challengeDay) => challengeDay.challenge)
  challengeDays: Relation<ChallengeDay>[];


  @OneToMany(() => SmallTalk, (smallTalk) => smallTalk.challenge)
  smallTalks: Relation<SmallTalk>[];

  // @ManyToOne(() => Affiliation, (affiliation) => affiliation.challenges, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // @JoinColumn([
  //   { name: "affiliation_id", referencedColumnName: "affiliation_id" },
  // ])
  // affiliation: Relation<Affiliation>;

  @OneToMany(
    () => ChallengeDepositDeduction,
    (challengeDepositDeduction) => challengeDepositDeduction.challenge
  )
  challengeDepositDeductions: Relation<ChallengeDepositDeduction>[];

  @OneToMany(() => Question, (question) => question.challenge)
  questions: Relation<Question>[];

  @OneToMany(() => Satisfaction, (satisfaction) => satisfaction.challenge)
  satisfactions: Relation<Satisfaction>[];

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.challenge)
  userChallenges: Relation<UserChallenge>[];


  public getName(){
    return this.name;
  }

  public getRefundCondition(){
    return this.refund_conditions;
  }

  public getDeposit(){
    return this.deposit;
  }

  public getId(){
    return this.challenge_id;
  }

  public getRestart(){
    return this.restart;
  }

  public getReviewUrl(){
    return this.review_url;
  }
}
