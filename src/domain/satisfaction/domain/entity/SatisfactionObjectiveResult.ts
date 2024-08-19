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
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";



// @Index(
//   "SatisfactionObjectiveResult_satisfaction_id_fkey_idx",
//   ["satisfaction_id"],
//   {}
// )
// @Index(
//   "SatisfactionObjectiveResult_user_challenge_id_fkey_idx",
//   ["user_challenge_id"],
//   {}
// )
@Entity("satisfaction_objective_result", { schema: "nest" })
export class SatisfactionObjectiveResult extends BaseEntity{


  constructor(
    score:number,
    satisfactionId:number,
    userChallengeId:number
  ){
    super();
    this.setScore(score);
    this.setSatisfactionId(satisfactionId);
    this.setUserChallengeId(userChallengeId);
  }

  public static createSatisfactionObjectiveResult(
    score:number,
    satisfactionId:number,
    userChallengeId:number
  ){
    return new SatisfactionObjectiveResult(score, satisfactionId, userChallengeId);
  }


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

  private setScore(score:number){
    this.score=score;
  }

  private setSatisfactionId(satisfactionId:number){
    this.satisfactionId=satisfactionId
  }

  private setUserChallengeId(userChallengeId:number){
    this.userChallengeId=userChallengeId;
  }



}
