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
import { Challenge } from "../../../challenge/domain/entity/Challenge.js";
import { SatisfactionObjectiveResult } from "./SatisfactionObjectiveResult.js";
import { SatisfactionSubjectiveResult } from "./SatisfactionSubjectiveResult.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Index("Satiscation_challenge_id_fkey_idx", ["challenge_id"], {})
@Entity("satisfaction", { schema: "nest" })
export class Satisfaction extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "satisfaction_id" })
  satisfaction_id: number;

  @Column("varchar", { name: "question", length: 70 })
  question: string;

  @Column("int", { name: "challenge_id" })
  challenge_id: number;

  @Column("varchar", { name: "type", length: 6 })
  type: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.satisfactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challenge_id" }])
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
    return this.satisfaction_id;
  }

  public getType(){
    return this.type;
  }

  public getQuestion(){
    return this.question;
  }
}
