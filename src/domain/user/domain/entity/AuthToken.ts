import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { User } from './User';

@Entity('auth_token')
export class AuthToken extends BaseEntity {
  constructor(token: string, userId: number) {
    super();
    this.setToken(token);
    this.setUserId(userId);
  }

  public static createAuthToken(token: string, userId: number) {
    return new AuthToken(token, userId);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'auth_token_id' })
  authTokenId: number;

  @Column('varchar', { name: 'token' })
  token: string;

  @Column('int', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.authTokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Relation<User>;

  private setToken(token: string) {
    this.token = token;
  }

  private setUserId(userId: number) {
    this.userId = userId;
  }

  public getToken() {
    return this.token;
  }
}
