
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Affiliation } from "./Affiliation.js";
import { Challenge } from "../../../challenge/domain/entity/Challenge.js";
import { UserTemplete } from "../../../template/domain/entity/UserTemplete.js";
import { Agora } from "../../../agora/domain/entity/Agora.js";
import { SatisfactionObjectiveResult } from "../../../satisfaction/domain/entity/SatisfactionObjectiveResult.js";
import { SatisfactionSubjectiveResult } from "../../../satisfaction/domain/entity/SatisfactionSubjectiveResult.js";


@Index("UserChallenge_user_challenge_id_key", ["userChallengeId"], {
  unique: true,
})
@Index("UserChallenge_affiliation_id_fkey", ["affiliationId"], {})
@Index("UserChallenge_challenge_id_fkey", ["challengeId"], {})
@Entity("UserChallenge", { schema: "nest" })
export class UserChallenge {
  @PrimaryGeneratedColumn({ type: "int", name: "user_challenge_id" })
  userChallengeId: number;

  @Column("int", { primary: true, name: "affiliation_id" })
  affiliationId: number;

  @Column("int", { primary: true, name: "challenge_id" })
  challengeId: number;

  @Column("int", { name: "user_deposit" })
  userDeposit: number;

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

  @Column("varchar", { name: "cheering_phrase", nullable: true, length: 255 })
  cheeringPhrase: string | null;

  @Column("date", { name: "cheering_phrase_date", nullable: true })
  cheeringPhraseDate: string | null;

  @Column("tinyint", { name: "review" })
  review: number;

  @Column("int", { name: "check_count", nullable: true })
  checkCount: number | null;

  @Column("tinyint", { name: "re_engagement", nullable: true })
  reEngagement: number | null;

  @OneToMany(() => Agora, (agora) => agora.userChallenge)
  agoras: Agora[];

  @OneToMany(
    () => SatisfactionObjectiveResult,
    (satisfactionObjectiveResult) => satisfactionObjectiveResult.userChallenge
  )
  satisfactionObjectiveResults: SatisfactionObjectiveResult[];

  @OneToMany(
    () => SatisfactionSubjectiveResult,
    (satisfactionSubjectiveResult) => satisfactionSubjectiveResult.userChallenge
  )
  satisfactionSubjectiveResults: SatisfactionSubjectiveResult[];

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.userChallenges, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "affiliation_id", referencedColumnName: "affiliationId" },
  ])
  affiliation: Affiliation;

  @ManyToOne(() => Challenge, (challenge) => challenge.userChallenges, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "challenge_id", referencedColumnName: "challengeId" }])
  challenge: Challenge;

  @OneToMany(() => UserTemplete, (userTemplete) => userTemplete.userChallenge)
  userTempletes: UserTemplete[];
}
