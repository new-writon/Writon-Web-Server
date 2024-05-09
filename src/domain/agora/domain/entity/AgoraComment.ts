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
import { Agora } from "./Agora.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";

@Index("AgoraComment_agora_id_fkey_idx", ["agora_id"], {})
@Index("AgoraComment_affiliation_id_fkey_idx", ["affiliation_id"], {})
@Entity("AgoraComment", { schema: "nest" })
export class AgoraComment extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "agora_comment_id" })
  agora_comment_id: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("int", { primary: true, name: "agora_id" })
  agora_id: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliation_id: number;


  @ManyToOne(() => Affiliation, (affiliation) => affiliation.agoraComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliation_id" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => Agora, (agora) => agora.agoraComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "agora_id", referencedColumnName: "agora_id" }])
  agora: Relation<Agora>;
}
