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
        private readonly templateVerifyService:TemplateVerifyService
    ){}

    public async giveUserTemplateByUserChallengeId(userChallengeId: number, verifyFlag:boolean): Promise<UserTemplate[]>{
        const datas = await this.userTemplateRepository.findUserTemplateByUserChallengeId(userChallengeId);
        if(verifyFlag) this.templateVerifyService.verifyUserTemplates(datas);
        return datas;
    };

    public async giveChallengeSuccessChallengeCount(userChallengeId:number): Promise<number>{
        return this.userTemplateRepository.findChallengeSuccessChallengeCount(userChallengeId);
    };

    // public async giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number, verifyFlag:boolean): Promise<UserTemplate[]>{
    //     const datas = await this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId);
    //     if(verifyFlag) this.templateVerifyService.verifyUserTemplates(datas);
    //     return datas;
    // }

    // public async giveUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number, verifyFlag:boolean): Promise<TemplateContent[]>{
    //     const datas = await this.userTemplateRepository.findUserTemplateByChallengeIdForAffiliationId(affiliationId, challengeId);
    //     if(verifyFlag) this.templateVerifyService.verifyTemplateContents (datas);
    //     return datas;
    // }

    public async exexuteInsertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplate>{
        return this.userTemplateRepository.insertUserTemplate(userChallnegeId, date, complete);
    }

    public async giveUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number, verifyFlag:boolean):Promise<UserTemplate[]>{
        const datas = await this.userTemplateRepository.findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId);
        if(verifyFlag) this.templateVerifyService.verifyUserTemplates(datas);
        return datas;
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(userChallengeId:number[], date:Date, verifyFlag:boolean):Promise<UserTemplate[]>{
        const datas = await this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(userChallengeId, date);
        if(verifyFlag) this.templateVerifyService.verifyUserTemplates(datas);
        return datas;
    }

    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(userChallengeId:number, verifyFlag:boolean):Promise<UserTemplate[]>{
        const datas = await this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(userChallengeId);
        if(verifyFlag) this.templateVerifyService.verifyUserTemplates(datas);
        return datas;
    }



    public async giveUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId:number, visibility:boolean, verifyFlag:boolean):Promise<UserTemplate>{
        const data = await this.userTemplateRepository.findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId, visibility);
        if(verifyFlag) this.templateVerifyService.verifyUserTemplate(data);
        return data;
    }

    public async giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]){
        return this.userTemplateRepository.findUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
    }

}