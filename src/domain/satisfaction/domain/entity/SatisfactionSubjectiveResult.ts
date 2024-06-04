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
  ["satisfaction_id"],
  {}
)
@Index(
  "SatisfactionSubjectiveResult_user_challenge_id_fkey_idx",
  ["user_challenge_id"],
  {}
)
@Entity("SatisfactionSubjectiveResult", { schema: "nest" })
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

  private static createSatisfactionSubjectiveResult(
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
  satisfaction_subjective_result_id: number;

  @Column("varchar", { name: "answer", length: 600 })
  answer: string;

  @Column("int", { name: "satisfaction_id" })
  satisfaction_id: number;

  @Column("int", { name: "user_challenge_id" })
  user_challenge_id: number;

  @ManyToOne(
    () => Satisfaction,
    (satisfaction) => satisfaction.satisfactionSubjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "satisfaction_id", referencedColumnName: "satisfaction_id" },
  ])
  satisfaction: Relation<Satisfaction>;

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.satisfactionSubjectiveResults,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "user_challenge_id" },
  ])
  userChallenge: Relation<UserChallenge>;


  private setAnswer(answer:string){
    this.answer=answer;
  }

  private setSatisfactionId(satisfactionId:number){
    this.satisfaction_id=satisfactionId
  }

  private setUserChallengeId(userChallengeId:number){
    this.user_challenge_id=userChallengeId;
  }
}
