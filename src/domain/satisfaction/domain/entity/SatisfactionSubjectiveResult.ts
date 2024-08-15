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
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// @Index(
//   "SatisfactionSubjectiveResult_satisfaction_id_fkey_idx",
//   ["satisfaction_id"],
//   {}
// )
// @Index(
//   "SatisfactionSubjectiveResult_user_challenge_id_fkey_idx",
//   ["user_challenge_id"],
//   {}
// )
@Entity("satisfaction_subjective_result", { schema: "nest" })
export class SatisfactionSubjectiveResult extends BaseEntity{

  constructor(
    answer:string,
    satisfactionId:number,
    userChallengeId:number
  ){
    super();
    this.setAnswer(answer);
    this.setSatisfactionId(satisfactionId);
    this.setUserChallengeId(userChallengeId);
  }

  public static createSatisfactionSubjectiveResult(
    answer:string,
    satisfactionId:number,
    userChallengeId:number
  ){
    return new SatisfactionSubjectiveResult(answer, satisfactionId, userChallengeId);
  }


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


  private setAnswer(answer:string){
    this.answer=answer;
  }

  private setSatisfactionId(satisfactionId:number){
    this.satisfactionId=satisfactionId
  }

  private setUserChallengeId(userChallengeId:number){
    this.userChallengeId=userChallengeId;
  }
}
