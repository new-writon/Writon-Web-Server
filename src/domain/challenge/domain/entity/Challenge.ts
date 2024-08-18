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
import { SmallTalk} from "../../../smalltalk/domain/entity/SmallTalk.js";
import { ChallengeDay } from "./ChallengeDay.js";
import { ChallengeDepositDeduction } from "./ChallengeDepositDeduction.js";
import { Question } from "./Question.js";
import { Satisfaction } from "../../../satisfaction/domain/entity/Satisfaction.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { Organization } from "../../../../domain/user/domain/entity/Organization.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @Index("Challenge_challenge_id_key", ["challengeId"], { unique: true })
// @Index("Challenge_affiliation_id_fkey", ["affiliationId"], {})
@Entity("challenges", { schema: "nest" })
export class Challenge extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "challenge_id" })
  challengeId: number;

  @Column("int", { name: "organization_id" })
  organizationId: number;

  @Column("varchar", { name: "name", length: 40 })
  name: string;

  @Column("date", { name: "start_at" })
  startAt: string;

  @Column("date", { name: "finish_at" })
  finishAt: string;

  @Column("int", { name: "deposit" })
  deposit: number;

  @Column("longtext", { name: "refund_conditions", nullable: true })
  refundConditions: string | null;

  @Column("longtext", { name: "review_url", nullable: true })
  reviewUrl: string | null;

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

  @ManyToOne(() => Organization, (organization) => organization.challenges, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "orgnization_id", referencedColumnName: "organizationId" }])
  organization: Relation<Organization>;


  public getName(){
    return this.name;
  }

  public getRefundCondition(){
    return this.refundConditions;
  }

  public getDeposit(){
    return this.deposit;
  }

  public getId(){
    return this.challengeId;
  }

  public getRestart(){
    return this.restart;
  }

  public getReviewUrl(){
    return this.reviewUrl;
  }

  public getOrganization(){
    return this.organization;
  }
}
