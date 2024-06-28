import { Inject, Injectable } from "@nestjs/common";
import { UserTemplateRepository } from "../domain/repository/UserTemplate.Repository.js";
import { UserTemplete } from "../domain/entity/UserTemplete.js";
import { TemplateContent } from "../dto/response/TemplateContent.js";
import { TemplateVerifyService } from "../domain/service/TemplateVerify.Service.js";

@Injectable()
export class UserTemplateHelper{


    constructor(
        @Inject('usertemplateImpl')
        private readonly userTemplateRepository: UserTemplateRepository,
        private readonly templateVerifyService: TemplateVerifyService
    ){}

    public async giveUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplete[]>{
        return this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId);
    };

    public async giveChallengeSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
        return this.userTemplateRepository.findChallengeSuccessChallengeCount(affiliationId, challengeId);
    };

    public async giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>{
        return this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId);
    }

    public async giveUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]>{
        return this.userTemplateRepository.findUserTemplateByChallengeIdForAffiliationId(affiliationId, challengeId);
    }

    public async exexuteInsertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplete>{
        return this.userTemplateRepository.insertUserTemplate(userChallnegeId, date, complete);
    }

    public async giveUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplete[]>{
        const userTemplate = await this.userTemplateRepository.findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId);
        this.templateVerifyService.verifyUserTemplates(userTemplate);
        return userTemplate;
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId:number[], date:Date):Promise<UserTemplete[]>{
        return this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId, date);
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId:number, visibility:boolean):Promise<UserTemplete>{
        return this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility);
    }

}