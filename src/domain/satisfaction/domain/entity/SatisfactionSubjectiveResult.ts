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
  "SatisfactionSubjectiveResult_satisfaction_id_fkey_idx",
  ["satisfactionId"],
  {}
)
@Index(
  "SatisfactionSubjectiveResult_user_challenge_id_fkey_idx",
  ["userChallengeId"],
  {}
)
@Entity("SatisfactionSubjectiveResult", { schema: "nest" })
export class SatisfactionSubjectiveResult extends BaseEntity{
  @PrimaryGeneratedColumn({
    type: "int",
    name: "satisfaction_subjective_result_id",
  })
  satisfactionSubjectiveResultId: number;

  @Column("varchar", { name: "answer", length: 600 })
  answer: string;

  @Column("int", { name: "satisfaction_id" })
  satisfactionId: number;

  @Column("int", { name: "user_challenge_id" })
  userChallengeId: number;

  @ManyToOne(
    () => Satisfaction,
    (satisfaction) => satisfaction.satisfactionSubjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "satisfaction_id", referencedColumnName: "satisfactionId" },
  ])
  satisfaction: Relation<Satisfaction>;

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.satisfactionSubjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "userChallengeId" },
  ])
  userChallenge: Relation<UserChallenge>;
}
