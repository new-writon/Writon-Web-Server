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
import { Agora } from "./Agora.js";
import { BaseEntity } from "../../../../global/entity/base.entitiy.js";
import { InternalServerErrorException } from "@nestjs/common";

@Index("AgoraComment_agora_id_fkey_idx", ["agora_id"], {})
@Index("AgoraComment_affiliation_id_fkey_idx", ["affiliation_id"], {})
@Entity("AgoraComment", { schema: "nest" })
export class AgoraComment extends BaseEntity{

  constructor(
      agoraId:number,
      affiliationId:number,
      agoraComment:string
  ){
    super()
    this.setAgoraId(agoraId);
    this.setAffiliationId(affiliationId);
    this.setContent(agoraComment);
  }

  public static createAgoraComment(
    agoraId:number,
    affiliationId:number,
    agoraComment:string
  ){
    return new AgoraComment(agoraId, affiliationId, agoraComment);
  }


  @PrimaryGeneratedColumn({ type: "int", name: "agora_comment_id" })
  agora_comment_id: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("int", { primary: true, name: "agora_id" })
  agora_id: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliation_id: number;


  @ManyToOne(() => Affiliation, (affiliation) => affiliation.agoraComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliation_id" },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => Agora, (agora) => agora.agoraComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "agora_id", referencedColumnName: "agora_id" }])
  agora: Relation<Agora>;


  private setAgoraId(agoraId:number){
    if(agoraId === null)throw new InternalServerErrorException (`${__dirname} : agoraId 값이 존재하지 않습니다.`);
    this.agora_id=agoraId;
  }

  private setContent(content:string){
    if(content=== null)throw new InternalServerErrorException (`${__dirname} : content값이 존재하지 않습니다.`);
    this.content=content;
  }

  private setAffiliationId(affiliationId:number){
    if(affiliationId=== null)throw new InternalServerErrorException (`${__dirname} : affiliationId 값이 존재하지 않습니다.`);
    this.affiliation_id=affiliationId;
  }
}
