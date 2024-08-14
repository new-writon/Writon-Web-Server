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
import { Organization } from "./Organization.js";
import { User } from "./User.js";
import { AgoraComment } from "../../../agora/domain/entity/AgoraComment.js";
import { Challenge } from "../../../challenge/domain/entity/Challenge.js";
import { Comment } from "../../../template/domain/entity/Comment.js";
import { Likes } from "../../../template/domain/entity/Likes.js";
import { UserChallenge } from "./UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


@Index("Affiliation_affiliation_id_key", ["affiliation_id"], { unique: true })
@Index("Affiliation_user_id_fkey", ["user_id"], {})
@Index("Affiliation_organization_id_fkey", ["organization_id"], {})
@Entity("affiliations", { schema: "nest" })
export class Affiliation extends BaseEntity{


  constructor(
    userId: number,
    organizationId:number,
    nickname: string,
    job: string,
    jobIntroduce: string,
    hireDate: string,
    company: string,
    companyPublic: boolean,

  ){
    super(),
    this.setUserId(userId)
    this.setOrganizationId(organizationId)
    this.setNickname(nickname)
    this.setJob(job)
    this.setJobIntroduce(jobIntroduce)
    this.setHireDate(hireDate)
    this.setCompany(company)
    this.setCompanyPublic(companyPublic)
  }


  @PrimaryGeneratedColumn({ type: "int", name: "affiliation_id" })
  affiliation_id: number;

  @Column("int", { name: "organization_id" })
  organization_id: number;

  @Column("int", { name: "user_id" })
  user_id: number;

  @Column("date", { name: "hire_date", nullable: true })
  hire_date: string | null;

  @Column("varchar", { name: "job", nullable: true, length: 20 })
  job: string | null;

  @Column("varchar", { name: "job_introduce", nullable: true, length: 300 })
  job_introduce: string | null;

  @Column("varchar", { name: "nickname", length: 191 })
  nickname: string;

  @Column("varchar", { name: "company", nullable: true, length: 50 })
  company: string | null;

  @Column("tinyint", { name: "company_public", nullable: true, width: 1 })
  company_public: boolean | null;

  @ManyToOne(() => Organization, (organization) => organization.affiliations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "organization_id", referencedColumnName: "organization_id" },
  ])
  organization: Relation<Organization>;

  @ManyToOne(() => User, (user) => user.affiliations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
  user: User;

  @OneToMany(() => AgoraComment, (agoraComment) => agoraComment.affiliation)
  agoraComments: Relation<AgoraComment>[];

  @OneToMany(() => Challenge, (challenge) => challenge.affiliation)
  challenges: Relation<Challenge>[];

  @OneToMany(() => Comment, (comment) => comment.affiliation)
  comments: Relation<Comment>[];

  @OneToMany(() => Likes, (likes) => likes.affiliation)
  likes: Relation<Likes>[];

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.affiliation)
  userChallenges: Relation<UserChallenge>[];


  private setUserId(userId:number){
    if(userId === null) throw new InternalServerErrorException (`${__dirname} : userId 값이 존재하지 않습니다.`);
    this.user_id=userId;
  }

  private setOrganizationId(organizationId:number){
    if(organizationId === null) throw new InternalServerErrorException (`${__dirname} : organizationId 값이 존재하지 않습니다.`);
    this.organization_id=organizationId;
  }

  private setNickname(nickname:string){
    if(nickname === null) throw new InternalServerErrorException (`${__dirname} : nickname 값이 존재하지 않습니다.`);
    this.nickname=nickname;
  }

  private setJob(job:string){
    if(job === null) throw new InternalServerErrorException (`${__dirname} : job 값이 존재하지 않습니다.`);
    this.job=job;
  }

  private setJobIntroduce(jobIntroduce:string){
    if(jobIntroduce === null) throw new InternalServerErrorException (`${__dirname} : jobIntroduce 값이 존재하지 않습니다.`);
    this.job_introduce=jobIntroduce;
  }

  private setHireDate(hireDate:string){
    if(hireDate === null) throw new InternalServerErrorException (`${__dirname} : hireDate 값이 존재하지 않습니다.`);
    this.hire_date=hireDate;
  }

  private setCompany(company:string){
    if(company=== null) throw new InternalServerErrorException (`${__dirname} : company 값이 존재하지 않습니다.`);
    this.company=company
  }

  private setCompanyPublic(companyPublic:boolean){
    if(companyPublic === null) throw new InternalServerErrorException (`${__dirname} : companyPublic 값이 존재하지 않습니다.`);
    this.company_public=companyPublic;
  }


  public static createAffiliation(    
    userId: number,
    organizationId:number,
    nickname: string,
    job: string,
    jobIntroduce: string,
    hireDate: string,
    company: string,
    companyPublic: boolean
  ){
    return new Affiliation(
      userId,
      organizationId,
      nickname,
      job,
      jobIntroduce,
      hireDate,
      company,
      companyPublic
    )
  }



  public getAffiliationId(): number{
    return this.affiliation_id
  }

  public getNickname(): string{
    return this.nickname;
  }

  public getCompany(): string{
    return this.company;
  }

  public getCompanyPublic(): boolean{
    return this.company_public;
  }

  public getJob(): string{
    return this.job;
  }

  public getJobIntroduce(): string{
    return this.job_introduce;
  }

  public getHireDate(): string{
    return this.hire_date;
  }

  public getId(): number{
    return this.affiliation_id;
  }

  public getUser(){
    return this.user
  }

}
