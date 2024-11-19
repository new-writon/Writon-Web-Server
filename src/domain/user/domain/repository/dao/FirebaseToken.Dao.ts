import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/User';
import { Injectable } from '@nestjs/common';
import { FirebaseToken } from '../../entity/FirebaseToken';
import { FirebaseTokenRepository } from '../FirebaseToken.Repository';
import { Affiliation } from '../../entity/Affiliation';
import { UserChallenge } from '../../entity/UserChallenge';

/**
 * User DAO Class
 */
@Injectable()
export class FirebaseTokenDao
  extends Repository<FirebaseToken>
  implements FirebaseTokenRepository
{
  constructor(private dataSource: DataSource) {
    super(FirebaseToken, dataSource.createEntityManager());
  }

  async findFirebaseTokenByUserIdAndEngineValue(
    userId: number,
    engineValue: string,
  ): Promise<FirebaseToken> {
    return this.dataSource
      .createQueryBuilder()
      .select('fb')
      .from(FirebaseToken, 'fb')
      .where('fb.user_id = :userId', { userId })
      .andWhere('fb.engine_value = :engineValue', { engineValue })
      .getOne();
  }

  async insertFirebaseToken(
    userId: number,
    engineValue: string,
  ): Promise<void> {
    const newFirebaseToken = FirebaseToken.createFirebaseToken(
      engineValue,
      userId,
    );
    await this.save(newFirebaseToken);
  }

  async deleteFirebaseToken(
    userId: number,
    engineValue: string,
  ): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(FirebaseToken)
      .where('userId = :userId', { userId })
      .andWhere('engine_value = :engineValue', { engineValue })
      .execute();
  }

  async findFirebaseTokenWithUserChallengeId(): Promise<FirebaseToken[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('ft')
      .from(FirebaseToken, 'ft')
      .innerJoin(User, 'u', 'u.user_id = ft.user_id')
      .innerJoin(Affiliation, 'a', 'a.user_id = u.user_id')
      .innerJoin(UserChallenge, 'uc', 'uc.affiliation_id = a.affiliation_id')
      .getMany();
  }

  async deleteFirebaseTokens(
    userId: number,
    engineValues: string[],
  ): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(FirebaseToken)
      .where('userId = :userId', { userId })
      .andWhere('engine_value IN (:...engineValues)', { engineValues })
      .execute();
  }
}
