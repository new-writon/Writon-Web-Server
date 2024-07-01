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
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";


@Index("Comment_comment_id_key", ["comment_id"], { unique: true })
@Index("Comment_user_templete_id_fkey", ["user_templete_id"], {})
@Index("Comment_comment_group_fkey", ["comment_group"], {})
@Index("Comment_affiliation_id_fkey_idx", ["affiliation_id"], {})
@Entity("Comment")
export class Comment extends BaseEntity{

  constructor(
    affiliationId:number,
    content:string,
    userTemplateId:number,
    commentGroup:number
  ){
    super()
    this.setAffiliation(affiliationId);
    this.setContent(content);
    this.setUserTemplateId(userTemplateId);
    this.setCommentGroup(commentGroup);
  }



  @PrimaryGeneratedColumn({ type: "int", name: "comment_id" })
  comment_id: number;

  @Column("int", { name: "comment_group", nullable: true })
  comment_group: number | null;

  @Column("int", { primary: true, name: "user_templete_id" })
  user_templete_id: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliation_id: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("tinyint", { name: "check", nullable: true })
  check: number | null;

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliation_id" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => UserTemplete, (userTemplete) => userTemplete.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "user_templete_id", referencedColumnName: "user_templete_id" },
  ])
  userTemplete: Relation<UserTemplete>;


  public static createComment(affiliationId:number, content:string, userTemplateId:number, commentGroup:number){
    return new Comment(affiliationId, content, userTemplateId, commentGroup);
  }


  public getUserTemplateId(){
    return this.user_templete_id;
  }

  public getId(){
    return this.comment_id;
  }

  public getCreatedAt(){
    return this.createdAt;
  }

  public getContent(){
    return this.content;
  }

  public getAffiliationId(){
    return this.affiliation_id;
  }

  public getCheck(){
    return this.check;
  }

  public getCommentGroup(){
    return this.comment_group;
  }


  private setAffiliation(affiliationId:number){
    this.affiliation_id=affiliationId;
  }

  private setContent(content:string){
    this.content=content;
  }

  private setUserTemplateId(userTemplateId:number){
    this.user_templete_id=userTemplateId;
  }

  private setCommentGroup(commentGroup:number){
    this.comment_group=commentGroup;
  }
}
