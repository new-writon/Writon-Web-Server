import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Affiliation } from "../../../user/domain/entity/Affiliation.js";
import { UserTemplete } from "./UserTemplete.js";

@Index("Comment_comment_id_key", ["commentId"], { unique: true })
@Index("Comment_user_templete_id_fkey", ["userTempleteId"], {})
@Index("Comment_comment_group_fkey", ["commentGroup"], {})
@Index("Comment_affiliation_id_fkey_idx", ["affiliationId"], {})
@Entity("Comment", { schema: "nest" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "comment_id" })
  commentId: number;

  @Column("int", { name: "comment_group", nullable: true })
  commentGroup: number | null;

  @Column("int", { primary: true, name: "user_templete_id" })
  userTempleteId: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliationId: number;

  @Column("text", { name: "content" })
  content: string;

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

  @Column("tinyint", { name: "check", nullable: true })
  check: number | null;

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliationId" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => UserTemplete, (userTemplete) => userTemplete.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "user_templete_id", referencedColumnName: "userTempleteId" },
  ])
  userTemplete: Relation<UserTemplete>;
}
