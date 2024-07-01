import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Challenge } from "./Challenge.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";


@Index("ChallengeDepositDeduction_challenge_id_fkey", ["challenge_id"], {})
@Entity("ChallengeDepositDeduction", { schema: "nest" })
export class ChallengeDepositDeduction extends BaseEntity{
  @PrimaryGeneratedColumn({
    type: "int",
    name: "challenge_deposit_deduction_id",
  })
  challenge_deposit_deduction_id: number;

  @Column("int", { name: "challenge_id" })
  challenge_id: number;

  @Column("int", { name: "start_count" })
  start_count: number;
  
  @Column("int", { name: "deduction_amount" })
  deduction_amount: number;

  @Column("int", { name: "end_count" })
  end_count: number;

  @ManyToOne(
    () => Challenge,
    (challenge) => challenge.challengeDepositDeductions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challenge_id" }])
  challenge: Relation<Challenge>;
}
