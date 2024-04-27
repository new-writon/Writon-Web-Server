import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Satisfaction } from "./Satisfaction.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";



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
export class SatisfactionObjectiveResult extends BaseEntity{
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

  @ManyToOne(
    () => Satisfaction,
    (satisfaction) => satisfaction.satisfactionObjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "satisfaction_id", referencedColumnName: "satisfactionId" },
  ])
  satisfaction: Relation<Satisfaction>;

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.satisfactionObjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "userChallengeId" },
  ])
  userChallenge: Relation<UserChallenge>;
}
