import { Injectable } from "@nestjs/common";
import { LikeHelper } from "../helper/Like.Helper";
import { UserApi } from "../infrastructure/User.Api";
import { LikeCount } from "../dto/response/LikeCount";

@Injectable()
export class LikeServie{

    constructor(
        private readonly likeHelper:LikeHelper,
        private readonly userApi:UserApi
    ){}


    public async checkLike(likeId: number){
        await this.likeHelper.executeUpdateLikeCheck(likeId);
    }

    public async penetrateLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization,false);
        await this.likeHelper.executeInsertLike(affiliationData.getAffiliationId(), userTemplateId);
         // 검증 x
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }


    public async eraseLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization,false);
        await this.likeHelper.executeDeleteLike(affiliationData.getAffiliationId(), userTemplateId);
         // 검증 x
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }

    public async bringLikeCount(userTemplateId: number):Promise<LikeCount>{
         // 검증 x
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }
}