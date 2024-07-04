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
import { Comment } from "./Comment.js";
import { Likes } from "./Likes.js";
import { QuestionContent } from "./QuestionContent.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Index("UserTemplete_user_challenge_id_fkey", ["user_challenge_id"], {})
@Entity("UserTemplete")
export class UserTemplate extends BaseEntity{

  constructor(   
    userChallengeId:number,
    finished_at:Date,
    complete:boolean
  ){
    super();
    this.setUserChallengeId(userChallengeId);
    this.setFinishedAt(finished_at);
    this.setComplete(complete);
  }

  @PrimaryGeneratedColumn({ type: "int", name: "user_templete_id" })
  user_template_id: number;

  @Column("int", { name: "user_challenge_id" })
  user_challenge_id: number;

  @Column("date", { name: "finished_at", nullable: true })
  finished_at: Date | null;

  @Column("tinyint", { name: "complete", nullable: true, width: 1 })
  complete: boolean | null;

  @OneToMany(() => Comment, (comment) => comment.userTemplate)
  comments: Relation<Comment>[];

  @OneToMany(() => Likes, (likes) => likes.userTemplate)
  likes: Relation<Likes>[];

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.userTemplate
  )
  questionContents: Relation<QuestionContent>[];

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.userTemplates,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "user_challenge_id" },
  ])
  userChallenge: Relation<UserChallenge>;

  public static createUserTemplate(
    userChallengeId:number,
    finished_at:Date,
    complete:boolean
  ){
    return new UserTemplate(userChallengeId,finished_at,complete);
  }

  private setUserChallengeId(userChallengeId:number){
    if(userChallengeId === null) throw new InternalServerErrorException (`${__dirname} : userChallengeId 값이 존재하지 않습니다.`);
    this.user_challenge_id=userChallengeId
  }


  private setFinishedAt(finishedAt:Date){
    if(finishedAt === null) throw new InternalServerErrorException (`${__dirname} : finishedAt 값이 존재하지 않습니다.`);
    this.finished_at=finishedAt
  }

  private setComplete(complete:boolean){
    if(complete === null) throw new InternalServerErrorException (`${__dirname} : complete값이 존재하지 않습니다.`);
    this.complete=complete
  }

  public getId(){
    return this.user_template_id
  }

  public getFinishedAt(): Date{
    return this.finished_at;
  }

  public getComplete(): boolean{
    return this.complete;
  }

  public getUserChallengeId(){
    return this.user_challenge_id
  }

  public getQuestionContents(){
    return this.questionContents;
  }

  public getLikes(){
    return this.likes;
  }

  public getComments(){
    return this.comments
  }

  public getCreatedAt(){
    return this.createdAt;
  }



  
}
