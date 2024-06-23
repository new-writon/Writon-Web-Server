import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/User.js';
import { Injectable } from '@nestjs/common';
import { UserChallenge } from '../../entity/UserChallenge.js';
import { UserChallengeRepository } from '../UserChallenge.Repository.js';
import { Affiliation } from '../../entity/Affiliation.js';
import { Organization } from '../../entity/Organization.js';

/**
 * User DAO Class
 */
@Injectable()
export class UserChallengeDao extends Repository<UserChallenge> implements UserChallengeRepository{
    constructor(private dataSource: DataSource) { super(UserChallenge, dataSource.createEntityManager()); }

    async findUserChallengeByAffiliationIdAndChallengeId(affiliationId: number, challengeId: number):Promise<UserChallenge>{
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


    async insertUserChallenge(affiliationId:number, challengeId: number, deposit:number, review: number): Promise<void>{
        const newUserChallenge = UserChallenge.createChallengeUser(affiliationId, challengeId, deposit, review);
        this.save(newUserChallenge);
    }

    // async findUserChallengeWithUserIdAndOragnizationByChallengeId(userId:number, organization:string, challengeId:number):Promise<UserChallenge>{
    //     return this.dataSource.createQueryBuilder()
    //         .select('uc.*')
    //         .from(UserChallenge, 'uc')
    //         .where(sq => {
    //             const affiliationSubQuery = sq.subQuery()
    //                 .select('a.affiliation_id')
    //                 .from(Affiliation, 'a')
    //                 .where('a.user_id',{userId})
    //                 .andWhere(sq => {
    //                     const organizationSubQuery = sq.subQuery()
    //                         .select('o.organization_id')
    //                         .from(Organization, 'o')
    //                         .where('o.name = :organization', {organization})
    //                         .getQuery();
    //                     return `a.organization_id = (${organizationSubQuery})`;
    //                 }).getQuery();
    //             return `a.affiliation_id = (${affiliationSubQuery})`;
    //         })
    //         .andWhere('uc.challenge_id = :challengeId',{challengeId})
    //         .getOne();
    // }


    async findUserChallengeWithUserIdAndOragnizationByChallengeId(
        userId: number, 
        organization: string, 
        challengeId: number
    ): Promise<UserChallenge> {
        return this.dataSource.createQueryBuilder()
            .select('uc')
            .from(UserChallenge, 'uc')
            .innerJoin(Affiliation, 'a', 'uc.affiliation_id = a.affiliation_id')
            .innerJoin(Organization, 'o', 'a.organization_id = o.organization_id')
            .where('a.user_id = :userId', { userId })
            .andWhere('o.name = :organization', { organization })
            .andWhere('uc.challenge_id = :challengeId', { challengeId })
            .getOne();
    }

    async findUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId:number[], challengeId:number):Promise<UserChallenge[]>{
        return this.dataSource.createQueryBuilder()
            .select('uc')
            .from(UserChallenge, 'uc')
            .where('uc.challenge_id = :challengeId',{challengeId})
            .andWhere('uc.user_challenge_id IN (:...userChallengeIds)', { userChallengeIds: userChallengeId })
            .getMany();
    }


    async updateUserChallengeCheckCount(userChallengeId:number, checkCount:number):Promise<void>{
        await this.dataSource.createQueryBuilder()
            .update(UserChallenge)
            .set({
                check_count: checkCount
            })
            .where('user_challenge_id = :userChallengeId',{userChallengeId})
            .execute();
    }

    async findUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId:number, userId:number, organization:string):Promise<UserChallenge>{
        return this.dataSource.createQueryBuilder(UserChallenge, 'uc')
            .innerJoinAndSelect('uc.affiliation', 'a', 'a.affiliation_id = uc.affiliation_id')
            .innerJoin(Organization, 'o', 'o.organization_id = a.organization_id')
            .where('o.name = :organization',{organization})
            .andWhere('a.user_id = :userId',{userId})
            .andWhere('uc.challenge_id = :challengeId',{challengeId})
            .getOne();
    }

    async updateUserChallengeReview(userChallengeId:number): Promise<void>{
        await this.dataSource.createQueryBuilder()
            .update(UserChallenge)
            .set({
                review:1
            })
            .where('user_challenge_id = :userChallengeId',{userChallengeId})
            .execute();
    }

    async updateUserChallengeReEngagement(userChallengeId:number, check:boolean): Promise<void>{
        await this.dataSource.createQueryBuilder()
                .update(UserChallenge)
                .set({
                    re_engagement: check
                })
                .where('user_challenge_id = :userChallengeId',{userChallengeId})
                .execute();
    }

    async findUserChallengeAndAffiliationAndUserByUserChallengeIdAndChallengeId(userChallengeId:number[], challengeId:number):Promise<UserChallenge[]>{
        return this.dataSource.createQueryBuilder(UserChallenge, 'uc')
            .innerJoinAndSelect('uc.affiliation', 'a', 'a.affiliation_id = uc.affiliation_id')
            .innerJoinAndSelect('a.user', 'u', 'u.user_id = a.user_id')
            .where('uc.user_challenge_id IN (:...userChallengeIds)', { userChallengeIds: userChallengeId })
            .andWhere('uc.challenge_id = :challengeId',{challengeId})
            .getMany();
    }

    async findUserChallengePaticipantCount(challengeId:number):Promise<number>{
        return this.dataSource.createQueryBuilder()
            .select('uc')
            .from(UserChallenge, 'uc')
            .where('uc.challenge_id = :challengeId', {challengeId})
            .getCount();
    }

    async insertCheeringPhrase(affiliationId: number, challengeId: number, content: string):Promise<void>{
        await this.dataSource.createQueryBuilder()
        .update(UserChallenge)
        .set({
          cheering_phrase: content,
          cheering_phrase_date: () => 'CURDATE()' 
        })
        .where('affiliation_id = :affiliationId', { affiliationId })
        .andWhere('challenge_id = :challengeId', { challengeId })
        .execute();
    }

    async findUserChallengeAndAffiliationAndUserByChallengeId(challengeId:number):Promise<UserChallenge[]>{
        return this.dataSource.createQueryBuilder()
            .select('uc')
            .from(UserChallenge, 'uc')
            .innerJoinAndSelect('uc.affiliation', 'a', 'a.affiliation_id = uc.affiliation_id')
            .innerJoinAndSelect('a.user', 'u', 'u.user_id = a.user_id')
            .where('uc.challenge_id = :challengeId',{challengeId})
            .getMany();
    }

}