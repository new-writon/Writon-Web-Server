import { Inject, Injectable } from "@nestjs/common";
import { UserTemplateRepository } from "../domain/repository/UserTemplate.Repository.js";
import { UserTemplete } from "../domain/entity/UserTemplete.js";

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

}