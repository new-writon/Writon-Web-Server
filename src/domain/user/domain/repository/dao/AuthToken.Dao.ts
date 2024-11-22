import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FirebaseToken } from '../../entity/FirebaseToken';
import { AuthToken } from '../../entity/AuthToken';
import { AuthTokenRepository } from '../AuthToken.Repository';

/**
 * User DAO Class
 */
@Injectable()
export class AuthTokenDao
  extends Repository<AuthToken>
  implements AuthTokenRepository
{
  constructor(private dataSource: DataSource) {
    super(FirebaseToken, dataSource.createEntityManager());
  }

  async deleteAuthToken(userId: number, token: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(AuthToken)
      .where('userId = :userId', { userId })
      .andWhere('token = :token', { token })
      .execute();
  }

  async insertAuthToken(userId: number, token: string): Promise<void> {
    const newAuthToken = AuthToken.createAuthToken(token, userId);
    await this.save(newAuthToken);
  }

  async findAuthTokenByUserIdAndToken(
    userId: number,
    token: string,
  ): Promise<AuthToken> {
    return this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(AuthToken, 'at')
      .where('userId = :userId', { userId })
      .andWhere('token = :token', { token })
      .execute();
  }
}
