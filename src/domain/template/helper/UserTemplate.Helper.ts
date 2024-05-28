import { Inject, Injectable } from "@nestjs/common";
import { UserTemplateRepository } from "../domain/repository/UserTemplate.Repository.js";
import { UserTemplete } from "../domain/entity/UserTemplete.js";
import { TemplateContent } from "../dto/response/TemplateContent.js";

@Injectable()
export class UserTemplateHelper{


    constructor(
        @Inject('usertemplateImpl')
        private readonly userTemplateRepository: UserTemplateRepository,
    ){}

    public async giveUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplete[]>{
        return this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId);
    };

    public async giveSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
        return this.userTemplateRepository.findSuccessChallengeCount(affiliationId, challengeId);
    };

    public async giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>{
        return this.userTemplateRepository.findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId);
    }

    public async giveUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]>{
        return this.userTemplateRepository.findUserTemplateByChallengeIdForAffiliationId(affiliationId, challengeId);
    }

    public async insertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplete>{
        return this.userTemplateRepository.insertUserTemplate(userChallnegeId, date, complete);
    }

}