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
import { Question } from "./Question";
import { BaseEntity } from "../../../../global/entity/base.entitiy";


@Entity("keywords", { schema: "nest" })
export class Keyword extends BaseEntity{
  
  @PrimaryGeneratedColumn({ type: "int", name: "keyword_id" })
  keywordId: number;

  @Column("varchar", { name: "keyword", length: 10 })
  keyword: string;

  @OneToMany(() => Question, (questions) => questions.keyword)
  questions: Relation<Question>[];

}
