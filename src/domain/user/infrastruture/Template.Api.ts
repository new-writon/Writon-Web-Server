import { Injectable } from "@nestjs/common";
import { UserTemplate } from "src/domain/template/domain/entity/UserTemplate";
import { UserTemplateHelper } from "../../../domain/template/helper/UserTemplate.Helper";


@Injectable()
export class TemplateApi{


    constructor(
        private readonly userTemplateHelper: UserTemplateHelper
    ){}

    public async requestUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId, false);
    }

    public async requestChallengeSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
         // 검증 x
        return this.userTemplateHelper.giveChallengeSuccessChallengeCount(affiliationId, challengeId);
        
    }


    public async requestUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId, false);
    }


    public async requestUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]){
         // 검증 x
        return this.userTemplateHelper.giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
      
    }
}