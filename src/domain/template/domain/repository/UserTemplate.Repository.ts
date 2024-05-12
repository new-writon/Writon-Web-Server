import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserTemplete } from '../entity/UserTemplete';



export interface UserTemplateRepository extends Repository<UserTemplete> {

   findUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplete[]>;

   findSuccessChallengeCount(affiliationId: number, challengeId: number): Promise<number>;

   findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>;

}