import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserTemplete } from '../entity/UserTemplete';
import { TemplateContent } from '../../dto/response/TemplateContent';



export interface UserTemplateRepository extends Repository<UserTemplete> {

   findUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplete[]>;

   findSuccessChallengeCount(affiliationId: number, challengeId: number): Promise<number>;

   findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>;

   findUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]>;

}