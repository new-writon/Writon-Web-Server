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
  ["satisfaction_id"],
  {}
)
@Index(
  "SatisfactionObjectiveResult_user_challenge_id_fkey_idx",
  ["user_challenge_id"],
  {}
)
@Entity("SatisfactionObjectiveResult", { schema: "nest" })
export class SatisfactionObjectiveResult extends BaseEntity{
  @PrimaryGeneratedColumn({
    type: "int",
    name: "satisfaction_objective_result_id",
  })
  satisfaction_objective_result_id: number;

  @Column("int", { name: "score" })
  score: number;

  @Column("int", { name: "satisfaction_id" })
  satisfaction_id: number;

  @Column("int", { name: "user_challenge_id" })
  user_challenge_id: number;

  @ManyToOne(
    () => Satisfaction,
    (satisfaction) => satisfaction.satisfactionObjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "satisfaction_id", referencedColumnName: "satisfaction_id" },
  ])
  satisfaction: Relation<Satisfaction>;

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.satisfactionObjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "user_challenge_id" },
  ])
  userChallenge: Relation<UserChallenge>;
}
