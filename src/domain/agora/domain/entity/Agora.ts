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

import { AgoraComment } from "./AgoraComment.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";

@Index("Agora_user_challenge_id_fkey_idx", ["user_challenge_id"], {})
@Index("Agora_challenge_id_fkey_idx", ["challenge_id"], {})
@Entity("Agora", { schema: "nest" })
export class Agora extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "agora_id" })
  agora_id: number;

  @Column("text", { name: "question" })
  question: string;

  @Column("int", { primary: true, name: "user_challenge_id" })
  user_challenge_id: number;

  @Column("int", { primary: true, name: "challenge_id" })
  challenge_id: number;

  @ManyToOne(() => Challenge, (challenge) => challenge.agoras, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challenge_id" }])
  challenge: Relation<Challenge>;

  @ManyToOne(() => UserChallenge, (userChallenge) => userChallenge.agoras, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "user_challenge_id" },
  ])
  userChallenge: Relation<UserChallenge>;

  @OneToMany(() => AgoraComment, (agoraComment) => agoraComment.agora)
  agoraComments: Relation<AgoraComment>[];
}
