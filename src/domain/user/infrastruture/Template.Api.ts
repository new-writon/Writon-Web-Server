import { Injectable } from "@nestjs/common";
import { UserTemplete } from "src/domain/template/domain/entity/UserTemplete.js";
import { UserTemplateHelper } from "../../../domain/template/helper/UserTemplate.Helper.js";


@Injectable()
export class TemplateApi{


    constructor(
        private readonly userTemplateHelper: UserTemplateHelper
    ){}

    public async requestUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplete[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId);
    }

    public async requestSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
        return this.userTemplateHelper.giveSuccessChallengeCount(affiliationId, challengeId);
        
    }


    public async requestUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId);
    }
}