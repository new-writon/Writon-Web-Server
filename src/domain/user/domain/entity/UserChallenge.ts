
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Affiliation } from "./Affiliation.js";
import { Challenge } from "../../../challenge/domain/entity/Challenge.js";
import { UserTemplete } from "../../../template/domain/entity/UserTemplete.js";
import { Agora } from "../../../agora/domain/entity/Agora.js";
import { SatisfactionObjectiveResult } from "../../../satisfaction/domain/entity/SatisfactionObjectiveResult.js";
import { SatisfactionSubjectiveResult } from "../../../satisfaction/domain/entity/SatisfactionSubjectiveResult.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";
import { InternalServerErrorException } from "@nestjs/common";

@Index("UserChallenge_user_challenge_id_key", ["user_challenge_id"], {
  unique: true,
})
@Index("UserChallenge_affiliation_id_fkey", ["affiliation_id"], {})
@Index("UserChallenge_challenge_id_fkey", ["challenge_id"], {})
@Entity("UserChallenge", { schema: "nest" })
export class UserChallenge extends BaseEntity{

  constructor(   
    affiliationId:number,
    challengeId:number,
    deposit:number,
    review: number
  ){
    super();
    this.setAffiliationId(affiliationId);
    this.setChallengeId(challengeId);
    this.setDeposit(deposit);
    this.setReview(review)

    }


  @PrimaryGeneratedColumn({ type: "int", name: "user_challenge_id" })
  user_challenge_id: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliation_id: number;

  @Column("int", { primary: true, name: "challenge_id" })
  challenge_id: number;

  @Column("int", { name: "user_deposit" })
  user_deposit: number;

  @Column("varchar", { name: "cheering_phrase", nullable: true, length: 255 })
  cheering_phrase: string | null;

  @Column("date", { name: "cheering_phrase_date", nullable: true })
  cheering_phrase_date: string | null;

  @Column("tinyint", { name: "review" })
  review: number;

  @Column("int", { name: "check_count", nullable: true })
  check_count: number | null;

  @Column("tinyint", { name: "re_engagement", nullable: true })
  re_engagement: number | null;

  @OneToMany(() => Agora, (agora) => agora.userChallenge)
  agoras: Relation<Agora>[];

  @OneToMany(
    () => SatisfactionObjectiveResult,
    (satisfactionObjectiveResult) => satisfactionObjectiveResult.userChallenge
  )
  satisfactionObjectiveResults: Relation<SatisfactionObjectiveResult>[];

  @OneToMany(
    () => SatisfactionSubjectiveResult,
    (satisfactionSubjectiveResult) => satisfactionSubjectiveResult.userChallenge
  )
  satisfactionSubjectiveResults: Relation<SatisfactionSubjectiveResult>[];

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.userChallenges, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliation_id" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => Challenge, (challenge) => challenge.userChallenges, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challenge_id" }])
  challenge: Relation<Challenge>;

  @OneToMany(() => UserTemplete, (userTemplete) => userTemplete.userChallenge)
  userTempletes: Relation<UserTemplete>[];


  private setAffiliationId(affiliationId: number){
    if(affiliationId === null) throw new InternalServerErrorException (`${__dirname} : affiliationId 값이 존재하지 않습니다.`);
    this.affiliation_id=affiliationId;
  }

  private setChallengeId(challengeId: number){
    if(challengeId === null) throw new InternalServerErrorException (`${__dirname} : challengeId 값이 존재하지 않습니다.`);
    this.challenge_id=challengeId;
  }

  private setDeposit(deposit: number){
    if(deposit === null) throw new InternalServerErrorException (`${__dirname} : deposit 값이 존재하지 않습니다.`);
    this.user_deposit=deposit;
  }

  private setReview(review: number){
    if(review === null) throw new InternalServerErrorException (`${__dirname} : review 값이 존재하지 않습니다.`);
    this.review=review;
  }

  public getUserDeposit(){
    return this.user_deposit;
  }

  public getId(){
    return this.user_challenge_id;
  }

  public getCheckCount(){
    return this.check_count;
  }

  public getReview(){
    return this.review;
  }

  

  public static createChallengeUser(
    affiliationId:number,
    challengeId:number,
    deposit:number,
    review:number
  ){
    return new UserChallenge(affiliationId, challengeId, deposit, review);
  }


}
