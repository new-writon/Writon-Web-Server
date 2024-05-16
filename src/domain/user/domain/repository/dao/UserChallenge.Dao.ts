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


    
    async findUserChallengeByUserIdAndOrganizationAndChallengeId(userId: number, organization: string, challengeId: number): Promise<UserChallenge[]> {
        return await this.dataSource.query(`
            SELECT uc.*  FROM UserChallenge as uc
            WHERE uc.affiliation_id = ( SELECT a.affiliation_id FROM Affiliation as a
                WHERE a.user_id = ${userId} 
                AND a.organization_id = (
                    SELECT o.organization_id FROM Organization as o
                    WHERE o.name = '${organization}' ))
            AND uc.challenge_id = ${challengeId};
        
        `);
    }

}