import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { Injectable } from '@nestjs/common';

/**
 * User DAO Class
 */
@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource)
    {
        super(User, dataSource.createEntityManager());
    }
    public async selectUserById(userId: number): Promise<User> {
        return await this.findOne({
            where: {
                userId: userId
            }
        })
    }
}