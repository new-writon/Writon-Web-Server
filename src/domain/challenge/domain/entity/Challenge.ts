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
import { Agora } from "../../../agora/domain/entity/Agora.js";
import { Affiliation } from "../../../user/domain/entity/Affiliation.js";
import { ChallengeDay } from "./ChallengeDay.js";
import { ChallengeDepositDeduction } from "./ChallengeDepositDeduction.js";
import { Question } from "./Question.js";
import { Satisfaction } from "../../../satisfaction/domain/entity/Satisfaction.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";
import { Injectable } from "@nestjs/common";


@Index("Challenge_challenge_id_key", ["challengeId"], { unique: true })
@Index("Challenge_affiliation_id_fkey", ["affiliationId"], {})
@Entity("Challenge", { schema: "nest" })
export class Challenge {
  @PrimaryGeneratedColumn({ type: "int", name: "challenge_id" })
  challengeId: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliationId: number;

  @Column("varchar", { name: "name", length: 40 })
  name: string;

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


  @OneToMany(() => Agora, (agora) => agora.challenge)
  agoras: Relation<Agora>[];

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.challenges, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliationId" },
  ])
  affiliation: Relation<Affiliation>;

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
}
