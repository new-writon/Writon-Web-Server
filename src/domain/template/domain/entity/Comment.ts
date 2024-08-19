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

// @Index("Comment_comment_id_key", ["comment_id"], { unique: true })
// @Index("Comment_user_template_id_fkey", ["user_template_id"], {})
// @Index("Comment_comment_group_fkey", ["comment_group"], {})
// @Index("Comment_affiliation_id_fkey_idx", ["affiliation_id"], {})
@Entity("comments")
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
  commentId: number;

  @Column("int", { name: "comment_group", nullable: true })
  commentGroup: number | null;

  @Column("int", { name: "user_template_id" })
  userTemplateId: number;

  @Column("int", { name: "affiliation_id" })
  affiliationId: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("tinyint", { name: "check", nullable: true })
  check: number | null;

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliationId" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => UserTemplate, (userTemplate) => userTemplate.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "user_template_id", referencedColumnName: "userTemplateId" },
  ])
  userTemplate: Relation<UserTemplate>;


  public static createComment(affiliationId:number, content:string, userTemplateId:number, commentGroup:number){
    return new Comment(affiliationId, content, userTemplateId, commentGroup);
  }


  public getUserTemplateId(){
    return this.userTemplateId;
  }

  public getId(){
    return this.commentId;
  }

  public getCreatedAt(){
    return this.createdAt;
  }

  public getContent(){
    return this.content;
  }

  public getAffiliationId(){
    return this.affiliationId;
  }

  public getCheck(){
    return this.check;
  }

  public getCommentGroup(){
    return this.commentGroup;
  }


  private setAffiliation(affiliationId:number){
    this.affiliationId=affiliationId;
  }

  private setContent(content:string){
    this.content=content;
  }

  private setUserTemplateId(userTemplateId:number){
    this.userTemplateId=userTemplateId;
  }

  private setCommentGroup(commentGroup:number){
    this.commentGroup=commentGroup;
  }
}
