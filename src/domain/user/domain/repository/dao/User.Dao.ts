import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/User';
import { Injectable } from '@nestjs/common';
import { UserAffiliationOrganization } from '../../../dto/values/UserAffilatiionOrganization.interface';
import { UserRepository } from '../User.Repository';

/**
 * User DAO Class
 */
@Injectable()
export class UserDao extends Repository<User> implements UserRepository {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async selectUserById(userId: number): Promise<User> {
    return await this.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async selectUserDataBySocialNumberOrIdentifier(
    socialNumber: string,
  ): Promise<User> {
    return await this.findOne({
      where: {
        identifier: socialNumber,
      },
    });
  }

  async kakaoSignUp(email: string, kakaoNumber: string, kakaoProfile: string) {
    const newUser = User.createKakaoUser(
      email,
      kakaoNumber,
      kakaoProfile,
      'USER',
    );
    return await this.save(newUser);
  }

  async localSignUp(identifier: string, password: string, email: string) {
    const newUser = User.createLocalUser(identifier, password, email, 'USER');
    return await this.save(newUser);
  }

  async findUserAffiliation(
    userId: number,
    organization: string,
  ): Promise<UserAffiliationOrganization[]> {
    return await this.dataSource.query(`
            SELECT *
            FROM User AS u
            INNER JOIN Affiliation AS a ON a.user_id = u.user_id
            INNER JOIN Organization AS o ON o.organization_id = a.organization_id
            WHERE a.user_id = ${userId} AND o.name = '${organization}'
        `);
  }

  async findUserByEmail(email: string) {
    return this.findOne({
      where: {
        email: email,
      },
    });
  }

  async updatePassword(idenfitier: string, email: string, password: string) {
    await this.update(
      { identifier: idenfitier, email: email },
      { password: password },
    );
  }

  async updatePasswordByUserId(userId: number, newPassword: string) {
    await this.update({ userId: userId }, { password: newPassword });
  }

  async updateAccount(
    accountNumber: string,
    bank: string,
    userId: number,
  ): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({
        accountNumber: accountNumber,
        bank,
      })
      .where('user_id = :userId', { userId })
      .execute();
  }

  async updateAlarm(userId: number, content: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({ alarm: content })
      .where('user_id = :userId', { userId })
      .execute();
  }
}
