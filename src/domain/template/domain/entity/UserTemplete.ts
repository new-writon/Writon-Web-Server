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
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";


@Index("UserTemplete_user_challenge_id_fkey", ["user_challenge_id"], {})
@Entity("UserTemplete", { schema: "nest" })
export class UserTemplete extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "user_templete_id" })
  user_templete_id: number;

  @Column("int", { name: "user_challenge_id" })
  user_challenge_id: number;

  @Column("date", { name: "finished_at", nullable: true })
  finished_at: string | null;

  @Column("tinyint", { name: "complete", nullable: true, width: 1 })
  complete: boolean | null;

  @OneToMany(() => Comment, (comment) => comment.userTemplete)
  comments: Relation<Comment>[];

  @OneToMany(() => Likes, (likes) => likes.userTemplete)
  likes: Relation<Likes>[];

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.userTemplete
  )
  questionContents: Relation<QuestionContent>[];

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.userTempletes,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "user_challenge_id" },
  ])
  userChallenge: Relation<UserChallenge>;



  public getId(){
    return this.user_templete_id
  }
}
