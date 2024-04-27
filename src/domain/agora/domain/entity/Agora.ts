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

@Index("Agora_user_challenge_id_fkey_idx", ["userChallengeId"], {})
@Index("Agora_challenge_id_fkey_idx", ["challengeId"], {})
@Entity("Agora", { schema: "nest" })
export class Agora extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "agora_id" })
  agoraId: number;

  @Column("text", { name: "question" })
  question: string;

  @Column("int", { primary: true, name: "user_challenge_id" })
  userChallengeId: number;

  @Column("int", { primary: true, name: "challenge_id" })
  challengeId: number;

  @ManyToOne(() => Challenge, (challenge) => challenge.agoras, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Relation<Challenge>;

  @ManyToOne(() => UserChallenge, (userChallenge) => userChallenge.agoras, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "userChallengeId" },
  ])
  userChallenge: Relation<UserChallenge>;

  @OneToMany(() => AgoraComment, (agoraComment) => agoraComment.agora)
  agoraComments: Relation<AgoraComment>[];
}
