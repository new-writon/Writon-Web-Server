import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Challenge } from "./Challenge.js";


@Index("ChallengeDay_challenge_id_fkey", ["challengeId"], {})
@Entity("ChallengeDay", { schema: "nest" })
export class ChallengeDay {
  @PrimaryGeneratedColumn({ type: "int", name: "challenge_day_id" })
  challengeDayId: number;

  @Column("int", { name: "challenge_id" })
  challengeId: number;

  @Column("date", { name: "day" })
  day: string;

  
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

  @ManyToOne(() => Challenge, (challenge) => challenge.challengeDays, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Challenge;


  
}
