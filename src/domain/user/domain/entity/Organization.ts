import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Affiliation } from "./Affiliation.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Entity("organization", { schema: "nest" })
export class Organization extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "organization_id" })
  organization_id: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @OneToMany(() => Affiliation, (affiliation) => affiliation.organization)
  affiliations: Relation<Affiliation>[];


  public getId(){
    return this.organization_id;
  }
}
