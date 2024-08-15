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
import { UserTemplate } from "./UserTemplate.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// @Index("Like_like_id_key", ["like_id"], { unique: true })
// @Index("Like_user_template_id_fkey", ["user_template_id"], {})
// @Index("Like_affiliation_id_fkey_idx", ["affiliation_id"], {})
@Entity("likes", { schema: "nest" })
export class Likes extends BaseEntity{

  constructor(
    affiliationId:number,
    userTemplateId:number
  ){
    super()
    this.setAffilationId(affiliationId);
    this.setUserTemplateId(userTemplateId)
  }


  @PrimaryGeneratedColumn({ type: "int", name: "like_id" })
  likeId: number;

  @Column("int", { name: "affiliation_id" })
  affiliationId: number;

  @Column("int", { name: "user_template_id" })
  userTemplateId: number;

  @Column("tinyint", { name: "check", nullable: true })
  check: number | null;

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliationId" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => UserTemplate, (userTemplate) => userTemplate.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "user_template_id", referencedColumnName: "userTemplateId" },
  ])
  userTemplate: Relation<UserTemplate>;

  public static createLike(affiliationId:number, userTemplateId:number){
    return new Likes(affiliationId, userTemplateId);
  }

  private setAffilationId(affiliation:number){
    this.affiliationId=affiliation;
  }

  private setUserTemplateId(userTemplateId:number){
    this.userTemplateId=userTemplateId;
  }

  public getCreatedAt(){
    return this.createdAt;
  }

  public getCheck(){
    return this.check;
  }

  public getId(){
    return this.likeId;
  }

  public getAffiliationId(){
    return this.affiliationId;
  }
}
