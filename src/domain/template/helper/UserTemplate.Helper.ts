import { Inject, Injectable } from "@nestjs/common";
import { UserTemplateRepository } from "../domain/repository/UserTemplate.Repository";
import { UserTemplate } from "../domain/entity/UserTemplate";
import { TemplateContent } from "../dto/response/TemplateContent";
import { TemplateVerifyService } from "../domain/service/TemplateVerify.Service";

@Injectable()
export class UserTemplateHelper{


    constructor(
        @Inject('usertemplateImpl')
        private readonly userTemplateRepository: UserTemplateRepository,
        private readonly templateVerifyService: TemplateVerifyService
    ){}

    public async giveUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplate[]>{
        return this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId);
    };

    public async giveChallengeSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
        return this.userTemplateRepository.findChallengeSuccessChallengeCount(affiliationId, challengeId);
    };

    public async giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplate[]>{
        return this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId);
    }

    public async giveUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]>{
        return this.userTemplateRepository.findUserTemplateByChallengeIdForAffiliationId(affiliationId, challengeId);
    }

    public async exexuteInsertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplate>{
        return this.userTemplateRepository.insertUserTemplate(userChallnegeId, date, complete);
    }

    public async giveUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplate[]>{
        const userTemplate = await this.userTemplateRepository.findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId);
       // this.templateVerifyService.verifyUserTemplates(userTemplate);
        return userTemplate;
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId:number[], date:Date):Promise<UserTemplate[]>{
        return this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId, date);
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId:number, visibility:boolean):Promise<UserTemplate>{
        return this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility);
    }

    public async giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]){
        return this.userTemplateRepository.findUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
    }

}