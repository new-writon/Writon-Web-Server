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
import { Challenge } from '../../../challenge/domain/entity/Challenge';
import { SmallTalkComment } from './SmallTalkComment';
import { UserChallenge } from '../../../user/domain/entity/UserChallenge';
import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { InternalServerErrorException } from '@nestjs/common';

@Index('small_talk_challenges_fkey', ['challengeId'], {})
@Index('small_talk_user_challenges_fkey', ['userChallengeId'], {})
@Entity('small_talk', { schema: 'nest' })
export class SmallTalk extends BaseEntity {
  constructor(challengeId: number, userChallengeId: number, question: string) {
    super();
    this.setChallengeId(challengeId);
    this.setUserChallengeId(userChallengeId);
    this.setQuestion(question);
  }

  public static createSmallTalk(challengeId: number, userChallengeId: number, question: string) {
    return new SmallTalk(challengeId, userChallengeId, question);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'small_talk_id' })
  smallTalkId: number;

  @Column('text', { name: 'question' })
  question: string;

  @Column('int', { name: 'user_challenge_id' })
  userChallengeId: number;

  @Column('int', { name: 'challenge_id' })
  challengeId: number;

  @ManyToOne(() => Challenge, (challenge) => challenge.smallTalks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'challenge_id', referencedColumnName: 'challengeId' }])
  challenge: Relation<Challenge>;

  @ManyToOne(() => UserChallenge, (userChallenge) => userChallenge.smallTalks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_challenge_id', referencedColumnName: 'userChallengeId' }])
  userChallenge: Relation<UserChallenge>;

  @OneToMany(() => SmallTalkComment, (smallTalkComment) => smallTalkComment.smallTalk)
  smallTalkComments: Relation<SmallTalkComment>[];

  private setChallengeId(challengeId: number) {
    if (challengeId === null)
      throw new InternalServerErrorException(`${__dirname} : challengeId 값이 존재하지 않습니다.`);
    this.challengeId = challengeId;
  }

  private setQuestion(question: string) {
    if (question === null)
      throw new InternalServerErrorException(`${__dirname} : question 값이 존재하지 않습니다.`);
    this.question = question;
  }

  private setUserChallengeId(userChallengeId: number) {
    if (userChallengeId === null)
      throw new InternalServerErrorException(
        `${__dirname} : userChallengeId 값이 존재하지 않습니다.`,
      );
    this.userChallengeId = userChallengeId;
  }
}
