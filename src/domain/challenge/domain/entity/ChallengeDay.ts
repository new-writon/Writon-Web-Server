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
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";


@Index("ChallengeDay_challenge_id_fkey", ["challengeId"], {})
@Entity("ChallengeDay", { schema: "nest" })
export class ChallengeDay extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "challenge_day_id" })
  challengeDayId: number;

  @Column("int", { name: "challenge_id" })
  challengeId: number;

  @Column("date", { name: "day" })
  day: Date;

  @ManyToOne(() => Challenge, (challenge) => challenge.challengeDays, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Relation<Challenge>;


  
}
