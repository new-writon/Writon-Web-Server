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
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";

@Index("Like_like_id_key", ["like_id"], { unique: true })
@Index("Like_user_templete_id_fkey", ["user_templete_id"], {})
@Index("Like_affiliation_id_fkey_idx", ["affiliation_id"], {})
@Entity("Likes", { schema: "nest" })
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
  like_id: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliation_id: number;

  @Column("int", { primary: true, name: "user_templete_id" })
  user_templete_id: number;

  @Column("tinyint", { name: "check", nullable: true })
  check: number | null;

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliation_id" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => UserTemplete, (userTemplete) => userTemplete.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "user_templete_id", referencedColumnName: "user_templete_id" },
  ])
  userTemplete: Relation<UserTemplete>;

  public static createLike(affiliationId:number, userTemplateId:number){
    return new Likes(affiliationId, userTemplateId);
  }

  private setAffilationId(affiliation:number){
    this.affiliation_id=affiliation;
  }

  private setUserTemplateId(userTemplateId:number){
    this.user_templete_id=userTemplateId;
  }

  public getCreatedAt(){
    return this.createdAt;
  }

  public getCheck(){
    return this.check;
  }

  public getId(){
    return this.like_id;
  }

  public getAffiliationId(){
    return this.affiliation_id;
  }
}
