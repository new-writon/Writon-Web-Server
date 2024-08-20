import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Affiliation } from "../../../user/domain/entity/Affiliation";
import { UserTemplate } from "./UserTemplate";
import { BaseEntity } from "../../../../global/entity/base.entitiy";




@Index("likes_user_templates_fkey", ["userTemplateId"], {})
@Index("likes_affiliations_fkey", ["affiliationId"], {})
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

  @Column("tinyint", { name: "check", default:false })
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
