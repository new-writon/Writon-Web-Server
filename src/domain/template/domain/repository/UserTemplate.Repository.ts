import {  Repository } from 'typeorm';
import { UserTemplate } from '../entity/UserTemplate';
import { TemplateContent } from '../../dto/response/TemplateContent';




export interface UserTemplateRepository extends Repository<UserTemplate> {

   findUserTemplateByUserChallengeId(userChallengeId: number): Promise<UserTemplate[]>;
   findChallengeSuccessChallengeCount(userChallengeId:number): Promise<number>;
   //findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplate[]>;
   findUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]>;
   insertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplate>;
   findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplate[]>;
   findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId:number[], date:Date):Promise<UserTemplate[]>;
   findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId:number, visibility:boolean):Promise<UserTemplate>;
   findUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]);

  
}