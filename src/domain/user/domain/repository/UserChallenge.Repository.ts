import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserChallenge } from '../entity/UserChallenge.js';


export interface UserChallengeRepository extends Repository<UserChallenge> {

    findUserChallengeByAffiliationIdAndId(affiliationId: number, challengeId: number):Promise<UserChallenge>;
    findUserChallengeByUserIdAndOrganizationAndChallengeId(userId: number, organization: string, challengeId: number):Promise<UserChallenge[]> 
    insertUserChallenge(affiliationId:number, challengeId: number, deposit:number, review: number): Promise<void>;
    findUserChallengeWithUserIdAndOragnizationByChallengeId(userId:number, organization:string, challengeId:number):Promise<UserChallenge>;
    findUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId:number[], challengeId:number):Promise<UserChallenge[]>;
    updateUserChallengeCheckCount(userChallengeId:number, checkCount:number):Promise<void>;
}   