import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/User.js';
import { Injectable } from '@nestjs/common';
import { UserChallenge } from '../../entity/UserChallenge.js';
import { UserChallengeRepository } from '../UserChallenge.Repository.js';

/**
 * User DAO Class
 */
@Injectable()
export class UserChallengeDao extends Repository<UserChallenge> implements UserChallengeRepository{
    constructor(private dataSource: DataSource) { super(UserChallenge, dataSource.createEntityManager()); }

    async findUserChallengeByAffiliationIdAndId(affiliationId: number, challengeId: number):Promise<UserChallenge>{
        return this.findOne({
            where:{
                affiliation_id: affiliationId,
                challenge_id: challengeId
            }
        })
    }
}