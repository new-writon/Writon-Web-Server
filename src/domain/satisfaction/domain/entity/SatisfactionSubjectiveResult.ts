import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Satisfaction } from './Satisfaction';
import { UserChallenge } from '../../../user/domain/entity/UserChallenge';
import { BaseEntity } from '../../../../global/entity/base.entitiy';

@Index('satisfaction_subjective_result_satisfaction_fkey', ['satisfactionId'], {})
@Index('satisfaction_subjective_result_user_challenges_fkey', ['userChallengeId'], {})
@Entity('satisfaction_subjective_result', { schema: 'nest' })
export class SatisfactionSubjectiveResult extends BaseEntity {
  constructor(answer: string, satisfactionId: number, userChallengeId: number) {
    super();
    this.setAnswer(answer);
    this.setSatisfactionId(satisfactionId);
    this.setUserChallengeId(userChallengeId);
  }

  public static createSatisfactionSubjectiveResult(
    answer: string,
    satisfactionId: number,
    userChallengeId: number,
  ) {
    return new SatisfactionSubjectiveResult(answer, satisfactionId, userChallengeId);
  }

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'satisfaction_subjective_result_id',
  })
  satisfactionSubjectiveResultId: number;

  @Column('varchar', { name: 'answer', length: 600 })
  answer: string;

  @Column('int', { name: 'satisfaction_id' })
  satisfactionId: number;

  @Column('int', { name: 'user_challenge_id' })
  userChallengeId: number;

  @ManyToOne(() => Satisfaction, (satisfaction) => satisfaction.satisfactionSubjectiveResults, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'satisfaction_id', referencedColumnName: 'satisfactionId' }])
  satisfaction: Relation<Satisfaction>;

  @ManyToOne(() => UserChallenge, (userChallenge) => userChallenge.satisfactionSubjectiveResults, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_challenge_id', referencedColumnName: 'userChallengeId' }])
  userChallenge: Relation<UserChallenge>;

  private setAnswer(answer: string) {
    this.answer = answer;
  }

  private setSatisfactionId(satisfactionId: number) {
    this.satisfactionId = satisfactionId;
  }

  private setUserChallengeId(userChallengeId: number) {
    this.userChallengeId = userChallengeId;
  }
}
