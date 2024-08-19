import { Injectable } from "@nestjs/common";
import { UserTemplate } from "src/domain/template/domain/entity/UserTemplate.js";
import { UserTemplateHelper } from "../../../domain/template/helper/UserTemplate.Helper.js";


@Injectable()
export class TemplateApi{


    constructor(
        private readonly userTemplateHelper: UserTemplateHelper
    ){}

    public async requestUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId);
    }

    public async requestChallengeSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
        return this.userTemplateHelper.giveChallengeSuccessChallengeCount(affiliationId, challengeId);
        
    }


    public async requestUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId);
    }


    public async requestUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]){
        return this.userTemplateHelper.giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
      
    }
}