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
import { Organization } from "./Organization.js";
import { User } from "./User.js";
import { AgoraComment } from "../../../agora/domain/entity/AgoraComment.js";
import { Challenge } from "../../../challenge/domain/entity/Challenge.js";
import { Comment } from "../../../template/domain/entity/Comment.js";
import { Likes } from "../../../template/domain/entity/Likes.js";
import { UserChallenge } from "./UserChallenge.js";
import { BaseEntity } from "../../../../global/entity/Base.Entitiy.js";


@Index("Affiliation_affiliation_id_key", ["affiliationId"], { unique: true })
@Index("Affiliation_user_id_fkey", ["userId"], {})
@Index("Affiliation_organization_id_fkey", ["organizationId"], {})
@Entity("Affiliation", { schema: "nest" })
export class Affiliation extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "affiliation_id" })
  affiliationId: number;

  @Column("int", { primary: true, name: "organization_id" })
  organizationId: number;

  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("date", { name: "hire_date", nullable: true })
  hireDate: string | null;

  @Column("varchar", { name: "job", nullable: true, length: 20 })
  job: string | null;

  @Column("varchar", { name: "job_introduce", nullable: true, length: 300 })
  jobIntroduce: string | null;

  @Column("varchar", { name: "nickname", length: 191 })
  nickname: string;

  @Column("varchar", { name: "company", nullable: true, length: 50 })
  company: string | null;

  @Column("tinyint", { name: "company_public", nullable: true, width: 1 })
  companyPublic: boolean | null;

  @ManyToOne(() => Organization, (organization) => organization.affiliations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "organization_id", referencedColumnName: "organizationId" },
  ])
  organization: Relation<Organization>;

  @ManyToOne(() => User, (user) => user.affiliations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @OneToMany(() => AgoraComment, (agoraComment) => agoraComment.affiliation)
  agoraComments: Relation<AgoraComment>[];

  @OneToMany(() => Challenge, (challenge) => challenge.affiliation)
  challenges: Relation<Challenge>[];

  @OneToMany(() => Comment, (comment) => comment.affiliation)
  comments: Relation<Comment>[];

  @OneToMany(() => Likes, (likes) => likes.affiliation)
  likes: Relation<Likes>[];

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.affiliation)
  userChallenges: Relation<UserChallenge>[];


  public getId(){
    return this.affiliationId;
  }
}
