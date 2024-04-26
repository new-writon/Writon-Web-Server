import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Satisfaction } from "./Satisfaction.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";

@Index(
  "SatisfactionObjectiveResult_satisfaction_id_fkey_idx",
  ["satisfactionId"],
  {}
)
@Index(
  "SatisfactionObjectiveResult_user_challenge_id_fkey_idx",
  ["userChallengeId"],
  {}
)
@Entity("SatisfactionObjectiveResult", { schema: "nest" })
export class SatisfactionObjectiveResult {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "satisfaction_objective_result_id",
  })
  satisfactionObjectiveResultId: number;

  @Column("int", { name: "score" })
  score: number;

  @Column("int", { name: "satisfaction_id" })
  satisfactionId: number;

  @Column("int", { name: "user_challenge_id" })
  userChallengeId: number;

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

  @ManyToOne(
    () => Satisfaction,
    (satisfaction) => satisfaction.satisfactionObjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "satisfaction_id", referencedColumnName: "satisfactionId" },
  ])
  satisfaction: Satisfaction;

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.satisfactionObjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "userChallengeId" },
  ])
  userChallenge: UserChallenge;
}
