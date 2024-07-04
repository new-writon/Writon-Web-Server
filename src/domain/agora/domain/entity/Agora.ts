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
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { AgoraComment } from "./AgoraComment.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import { InternalServerErrorException } from "@nestjs/common";

@Index("Agora_user_challenge_id_fkey_idx", ["user_challenge_id"], {})
@Index("Agora_challenge_id_fkey_idx", ["challenge_id"], {})
@Entity("Agora", { schema: "nest" })
export class Agora extends BaseEntity{

  constructor(
    challengeId:number,
    userChallengeId:number,
    question:string
  ){
    super()
    this.setChallengeId(challengeId);
    this.setUserChallengeId(userChallengeId);
    this.setQuestion(question);
  }

  public static createAgora(challengeId:number, userChallengeId:number, question:string){
    return new Agora(challengeId, userChallengeId, question);
  }


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


  private setChallengeId(challengeId:number){
    if(challengeId === null)throw new InternalServerErrorException (`${__dirname} : challengeId 값이 존재하지 않습니다.`);
    this.challenge_id=challengeId;
  }

  private setQuestion(question:string){
    if(question === null)throw new InternalServerErrorException (`${__dirname} : question 값이 존재하지 않습니다.`);
    this.question=question;
  }

  private setUserChallengeId(userChallengeId:number){
    if(userChallengeId === null)throw new InternalServerErrorException (`${__dirname} : userChallengeId 값이 존재하지 않습니다.`);
    this.user_challenge_id=userChallengeId;
  }
}
