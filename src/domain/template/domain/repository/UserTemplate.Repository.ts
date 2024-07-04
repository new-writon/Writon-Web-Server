import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserTemplate } from '../entity/UserTemplate';
import { TemplateContent } from '../../dto/response/TemplateContent';
import { WriteTemplateContent } from '../../dto/TemplateContent';



export interface UserTemplateRepository extends Repository<UserTemplate> {

   findUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplate[]>;
   findChallengeSuccessChallengeCount(affiliationId: number, challengeId: number): Promise<number>;
   findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplate[]>;
   findUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]>;
   insertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplate>;
   findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplate[]>;
   findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId:number[], date:Date):Promise<UserTemplate[]>;
   findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId:number, visibility:boolean):Promise<UserTemplate>;
 

  
}