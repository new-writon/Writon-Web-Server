import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserTemplete } from '../entity/UserTemplete';
import { TemplateContent } from '../../dto/response/TemplateContent';
import { WriteTemplateContent } from '../../dto/TemplateContent';



export interface UserTemplateRepository extends Repository<UserTemplete> {

   findUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplete[]>;

   findChallengeSuccessChallengeCount(affiliationId: number, challengeId: number): Promise<number>;

   findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>;

   findUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]>;

   insertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplete>;

   findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplete[]>;
  
}