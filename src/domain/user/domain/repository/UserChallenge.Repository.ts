import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserChallenge } from '../entity/UserChallenge';


export interface UserChallengeRepository extends Repository<UserChallenge> {

    findUserChallengeByAffiliationIdAndId(affiliationId: number, challengeId: number):Promise<UserChallenge>;

  
}