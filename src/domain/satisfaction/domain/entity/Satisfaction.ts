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
import { Challenge } from "../../../challenge/domain/entity/Challenge.js";
import { SatisfactionObjectiveResult } from "./SatisfactionObjectiveResult.js";
import { SatisfactionSubjectiveResult } from "./SatisfactionSubjectiveResult.js";

@Index("Satiscation_challenge_id_fkey_idx", ["challengeId"], {})
@Entity("Satisfaction", { schema: "nest" })
export class Satisfaction {
  @PrimaryGeneratedColumn({ type: "int", name: "satisfaction_id" })
  satisfactionId: number;

  @Column("varchar", { name: "question", length: 70 })
  question: string;

  @Column("int", { name: "challenge_id" })
  challengeId: number;

  @Column("varchar", { name: "type", length: 6 })
  type: string;

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

  @ManyToOne(() => Challenge, (challenge) => challenge.satisfactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Relation<Challenge>;

  @OneToMany(
    () => SatisfactionObjectiveResult,
    (satisfactionObjectiveResult) => satisfactionObjectiveResult.satisfaction
  )
  satisfactionObjectiveResults: Relation<SatisfactionObjectiveResult>[];

  @OneToMany(
    () => SatisfactionSubjectiveResult,
    (satisfactionSubjectiveResult) => satisfactionSubjectiveResult.satisfaction
  )
  satisfactionSubjectiveResults: Relation<SatisfactionSubjectiveResult>[];
}
