import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Affiliation } from "./Affiliation.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { Challenge } from "../../../../domain/challenge/domain/entity/Challenge.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Entity("organizations", { schema: "nest" })
export class Organization extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "organization_id" })
  organizationId: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @OneToMany(() => Affiliation, (affiliation) => affiliation.organization)
  affiliations: Relation<Affiliation>[];

  @OneToMany(() => Challenge, (challenge) => challenge.organization)
  challenges: Relation<Affiliation>[];


  public getId(){
    return this.organizationId;
  }

  public getChallenges(){
    return this.challenges;
  }
}
