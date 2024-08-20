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


//@Index("QuestionTag_question_id_fkey", ["question_id"], {})
@Entity("keywords", { schema: "nest" })
export class Keyword {
  
  @PrimaryGeneratedColumn({ type: "int", name: "keyword_id" })
  keywordId: number;

  @Column("varchar", { name: "keyword", length: 10 })
  keyword: string;

  @OneToMany(() => Question, (questions) => questions.keyword)
  questions: Relation<Question>[];

}
