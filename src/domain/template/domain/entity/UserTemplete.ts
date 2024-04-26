import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment.js";
import { Likes } from "./Likes.js";
import { QuestionContent } from "./QuestionContent.js";
import { UserChallenge } from "../../../user/domain/entity/UserChallenge.js";

@Index("UserTemplete_user_challenge_id_fkey", ["userChallengeId"], {})
@Entity("UserTemplete", { schema: "nest" })
export class UserTemplete {
  @PrimaryGeneratedColumn({ type: "int", name: "user_templete_id" })
  userTempleteId: number;

  @Column("int", { name: "user_challenge_id" })
  userChallengeId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "update_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updateAt: Date;

  @Column("date", { name: "finished_at", nullable: true })
  finishedAt: string | null;

  @Column("tinyint", { name: "complete", nullable: true, width: 1 })
  complete: boolean | null;

  @OneToMany(() => Comment, (comment) => comment.userTemplete)
  comments: Comment[];

  @OneToMany(() => Likes, (likes) => likes.userTemplete)
  likes: Likes[];

  @OneToMany(
    () => QuestionContent,
    (questionContent) => questionContent.userTemplete
  )
  questionContents: QuestionContent[];

  @ManyToOne(
    () => UserChallenge,
    (userChallenge) => userChallenge.userTempletes,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "user_challenge_id", referencedColumnName: "userChallengeId" },
  ])
  userChallenge: UserChallenge;
}
