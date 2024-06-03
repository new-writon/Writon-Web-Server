import { Injectable } from "@nestjs/common";
import { UserTemplateHelper } from "../../template/helper/UserTemplate.Helper.js";

@Injectable()
export class TemplateApi{

    constructor(
        private readonly userTemplateHelper: UserTemplateHelper
    ){}

    public async reqeustChallengeSuccessChallengeCount(affiliationId:number, challengeId: number): Promise<number>{
        return this.userTemplateHelper.giveChallengeSuccessChallengeCount(affiliationId, challengeId);
    }


}