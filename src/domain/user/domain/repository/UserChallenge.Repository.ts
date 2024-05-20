import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserChallenge } from '../entity/UserChallenge';


export interface UserChallengeRepository extends Repository<UserChallenge> {

    findUserChallengeByAffiliationIdAndId(affiliationId: number, challengeId: number):Promise<UserChallenge>;
    findUserChallengeByUserIdAndOrganizationAndChallengeId(userId: number, organization: string, challengeId: number):Promise<UserChallenge[]> 
    insertUserChallenge(affiliationId:number, challengeId: number, deposit:number, review: number): Promise<void>;
}