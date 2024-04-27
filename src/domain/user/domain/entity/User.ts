import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Affiliation } from "./Affiliation.js";


@Index("User_identifier_key", ["identifier"], { unique: true })
@Index("User_email_key", ["email"], { unique: true })
@Entity("User", { schema: "nest" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "role", length: 20 })
  role: string;

  @Column("varchar", { name: "identifier", unique: true, length: 40 })
  identifier: string;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "email", unique: true, length: 40 })
  email: string;

  @Column("varchar", { name: "profile", nullable: true, length: 500 })
  profile: string | null;

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

  @Column("varchar", { name: "account_number", nullable: true, length: 40 })
  accountNumber: string | null;

  @Column("varchar", { name: "bank", nullable: true, length: 20 })
  bank: string | null;

  @OneToMany(() => Affiliation, (affiliation) => affiliation.user)
  affiliations: Relation<Affiliation>[];
}
