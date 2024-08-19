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
import { Challenge } from "../../../challenge/domain/entity/Challenge";
import { SatisfactionObjectiveResult } from "./SatisfactionObjectiveResult";
import { SatisfactionSubjectiveResult } from "./SatisfactionSubjectiveResult";
import { BaseEntity } from "../../../../global/entity/base.entitiy";


//@Index("Satiscation_challenge_id_fkey_idx", ["challenge_id"], {})
@Entity("satisfaction", { schema: "nest" })
export class Satisfaction extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "satisfaction_id" })
  satisfactionId: number;

  @Column("varchar", { name: "question", length: 70 })
  question: string;

  @Column("int", { name: "challenge_id" })
  challengeId: number;

  @Column("varchar", { name: "type", length: 6 })
  type: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.satisfactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Relation<Challenge>;

  @OneToMany(
    () => SatisfactionObjectiveResult,
    (satisfactionObjectiveResult) => satisfactionObjectiveResult.satisfaction
  )
  satisfactionObjectiveResults: Relation<SatisfactionObjectiveResult>[];

  @OneToMany(
    () => SatisfactionSubjectiveResult,
    (satisfactionSubjectiveResult) => satisfactionSubjectiveResult.satisfaction
  )
  satisfactionSubjectiveResults: Relation<SatisfactionSubjectiveResult>[];


  public getId(){
    return this.satisfactionId;
  }

  public getType(){
    return this.type;
  }

  public getQuestion(){
    return this.question;
  }
}
