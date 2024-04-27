import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Affiliation } from "./Affiliation.js";

@Entity("Organization", { schema: "nest" })
export class Organization {
  @PrimaryGeneratedColumn({ type: "int", name: "organization_id" })
  organizationId: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "update_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updateAt: Date;

  @OneToMany(() => Affiliation, (affiliation) => affiliation.organization)
  affiliations: Relation<Affiliation>[];
}
