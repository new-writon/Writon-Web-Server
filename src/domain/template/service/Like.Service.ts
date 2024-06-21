import { Injectable } from "@nestjs/common";
import { LikeHelper } from "../helper/Like.Helper.js";
import { UserApi } from "../infrastructure/User.Api.js";
import { LikeCheck } from "../dto/request/LikeCheck.js";
import { LikeCount } from "../dto/response/LikeCount.js";

@Injectable()
export class LikeServie{

    constructor(
        private readonly likeHelper:LikeHelper,
        private readonly userApi:UserApi
    ){}


    public async checkLike(likeId: number){
        await this.likeHelper.executeUpdateLikeCheck(likeId);
    }

    public async addLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        await this.likeHelper.executeInsertLike(affiliationData.getAffiliationId(), userTemplateId);
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }


    public async cancelLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
     
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }
}