import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Affiliation } from './Affiliation';
import { Challenge } from '../../../challenge/domain/entity/Challenge';
import { UserTemplate } from '../../../template/domain/entity/UserTemplate';
import { SmallTalk } from '../../../smalltalk/domain/entity/SmallTalk';
import { SatisfactionObjectiveResult } from '../../../satisfaction/domain/entity/SatisfactionObjectiveResult';
import { SatisfactionSubjectiveResult } from '../../../satisfaction/domain/entity/SatisfactionSubjectiveResult';
import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { InternalServerErrorException } from '@nestjs/common';

@Index('user_challenges_affiliations_fkey', ['affiliationId'], {})
@Index('user_challenges_challenges_fkey', ['challengeId'], {})
@Entity('user_challenges', { schema: 'nest' })
export class UserChallenge extends BaseEntity {
  constructor(
    affiliationId: number,
    challengeId: number,
    deposit: number,
    review: number,
  ) {
    super();
    this.setAffiliationId(affiliationId);
    this.setChallengeId(challengeId);
    this.setDeposit(deposit);
    this.setReview(review);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'user_challenge_id' })
  userChallengeId: number;

  @Column('int', { name: 'affiliation_id' })
  affiliationId: number;

  @Column('int', { name: 'challenge_id' })
  challengeId: number;

  @Column('int', { name: 'user_deposit' })
  userDeposit: number;

  @Column('varchar', { name: 'cheering_phrase', nullable: true, length: 255 })
  cheeringPhrase: string | null;

  @Column('date', { name: 'cheering_phrase_date', nullable: true })
  cheeringPhraseDate: string | null;

  @Column('tinyint', { name: 'review' })
  review: number;

  @Column('int', { name: 'check_count', nullable: true })
  checkCount: number | null;

  @Column('tinyint', { name: 're_engagement', nullable: true })
  reEngagement: number | null;

  @Column('tinyint', { name: 'withdrawn', nullable: false, default: false })
  withdrawn: boolean;

  @OneToMany(() => SmallTalk, (smallTalk) => smallTalk.userChallenge)
  smallTalks: Relation<SmallTalk>[];

  @OneToMany(
    () => SatisfactionObjectiveResult,
    (satisfactionObjectiveResult) => satisfactionObjectiveResult.userChallenge,
  )
  satisfactionObjectiveResults: Relation<SatisfactionObjectiveResult>[];

  @OneToMany(
    () => SatisfactionSubjectiveResult,
    (satisfactionSubjectiveResult) =>
      satisfactionSubjectiveResult.userChallenge,
  )
  satisfactionSubjectiveResults: Relation<SatisfactionSubjectiveResult>[];

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.userChallenges, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'affiliation_id', referencedColumnName: 'affiliationId' },
  ])
  affiliation: Relation<Affiliation>;

  @ManyToOne(() => Challenge, (challenge) => challenge.userChallenges, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'challenge_id', referencedColumnName: 'challengeId' }])
  challenge: Relation<Challenge>;

  @OneToMany(() => UserTemplate, (userTemplate) => userTemplate.userChallenge)
  userTemplates: Relation<UserTemplate>[];

  private setAffiliationId(affiliationId: number) {
    if (affiliationId === null)
      throw new InternalServerErrorException(
        `${__dirname} : affiliationId 값이 존재하지 않습니다.`,
      );
    this.affiliationId = affiliationId;
  }

  private setChallengeId(challengeId: number) {
    if (challengeId === null)
      throw new InternalServerErrorException(
        `${__dirname} : challengeId 값이 존재하지 않습니다.`,
      );
    this.challengeId = challengeId;
  }

  private setDeposit(deposit: number) {
    if (deposit === null)
      throw new InternalServerErrorException(
        `${__dirname} : deposit 값이 존재하지 않습니다.`,
      );
    this.userDeposit = deposit;
  }

  private setReview(review: number) {
    if (review === null)
      throw new InternalServerErrorException(
        `${__dirname} : review 값이 존재하지 않습니다.`,
      );
    this.review = review;
  }

  public getUserDeposit() {
    return this.userDeposit;
  }

  public getId() {
    return this.userChallengeId;
  }

  public getCheckCount() {
    return this.checkCount;
  }

  public getReview() {
    return this.review;
  }

  public getAffiliation() {
    return this.affiliation;
  }

  public getChallengeId() {
    return this.challengeId;
  }

  public static createChallengeUser(
    affiliationId: number,
    challengeId: number,
    deposit: number,
    review: number,
  ) {
    return new UserChallenge(affiliationId, challengeId, deposit, review);
  }
}
