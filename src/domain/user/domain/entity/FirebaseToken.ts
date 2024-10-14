import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { User } from './User';

@Entity('firebase_tokens')
export class FirebaseToken extends BaseEntity {
  constructor(engineValue: string, userId: number) {
    super();
    this.setEngineValue(engineValue);
    this.setUserId(userId);
  }

  public static createFirebaseToken(engineValue: string, userId: number) {
    return new FirebaseToken(engineValue, userId);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'firebase_token_id' })
  firebaseTokenId: number;

  @Column('varchar', { name: 'engine_value' })
  engineValue: string;

  @Column('int', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.firebaseTokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Relation<User>;

  private setEngineValue(engineValue: string) {
    this.engineValue = engineValue;
  }

  private setUserId(userId: number) {
    this.userId = userId;
  }

  public getEngineValue() {
    return this.engineValue;
  }
}
