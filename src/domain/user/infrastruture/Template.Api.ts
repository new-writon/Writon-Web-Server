import { Injectable } from "@nestjs/common";
import { UserTemplate } from "src/domain/template/domain/entity/UserTemplate";
import { UserTemplateHelper } from "../../../domain/template/helper/UserTemplate.Helper";


@Injectable()
export class TemplateApi{


    constructor(
        private readonly userTemplateHelper: UserTemplateHelper
    ){}

    public async requestUserTemplateByUserChallengeId(userChallengeId: number, verifyFlag:boolean): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByUserChallengeId(userChallengeId, verifyFlag);
    }

    public async requestChallengeSuccessChallengeCount(userChallengeId:number): Promise<number>{
        return this.userTemplateHelper.giveChallengeSuccessChallengeCount(userChallengeId);
    }

    public async requestUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number, verifyFlag:boolean): Promise<UserTemplate[]>{
        return this.userTemplateHelper.giveUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId, challengeId, verifyFlag);
    }

    public async requestUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]){
        return this.userTemplateHelper.giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
    }
}