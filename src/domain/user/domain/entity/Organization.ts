import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Affiliation } from "./Affiliation";
import { BaseEntity } from "../../../../global/entity/base.entitiy";
import { Challenge } from "../../../../domain/challenge/domain/entity/Challenge";


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

  public getName(){
    return this.name;
  }
}
