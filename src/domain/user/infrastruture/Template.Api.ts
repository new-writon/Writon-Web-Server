import { Injectable } from "@nestjs/common";
import { UserTemplate } from "src/domain/template/domain/entity/UserTemplate";
import { UserTemplateHelper } from "../../../domain/template/helper/UserTemplate.Helper";


@Injectable()
export class TemplateApi{


    constructor(
        private readonly userTemplateHelper: UserTemplateHelper
    ){}

    public async requestUserTemplateByAffiliationAndChallengeId(affiliationId:number, challengeId: number, verifyFlag:boolean): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeId(affiliationId, challengeId, verifyFlag);
    }

    public async requestChallengeSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
        return this.userTemplateHelper.giveChallengeSuccessChallengeCount(affiliationId, challengeId);
        
    }

    public async requestUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number, verifyFlag:boolean): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId, verifyFlag);
    }

    public async requestUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]){
        return this.userTemplateHelper.giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
    }
}