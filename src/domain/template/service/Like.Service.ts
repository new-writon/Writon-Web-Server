import { Injectable } from "@nestjs/common";
import { LikeHelper } from "../helper/Like.Helper";
import { UserApi } from "../infrastructure/User.Api";
import { LikeCount } from "../dto/response/LikeCount";
import { TemplateVerifyService } from "../domain/service/TemplateVerify.Service";
import { MutexAlgorithm } from "../../../global/decorator/mutex";

@Injectable()
export class LikeServie{

    constructor(
        private readonly likeHelper:LikeHelper,
        private readonly userApi:UserApi ,
        private readonly templateVerifyService:TemplateVerifyService
    ){}


    public async checkLike(likeId: number){
        await this.likeHelper.executeUpdateLikeCheck(likeId);
    }

    @MutexAlgorithm()
    public async penetrateLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization,true);
        const likeData = await this.likeHelper.giveLikeByAffiliationIdAndUserTemplateId(affiliationData.getAffiliationId(), userTemplateId);
        this.templateVerifyService.verifyExistLike(likeData);
        await this.likeHelper.executeInsertLike(affiliationData.getAffiliationId(), userTemplateId);
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }


    public async eraseLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization,false);
        await this.likeHelper.executeDeleteLike(affiliationData.getAffiliationId(), userTemplateId);
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }

    public async bringLikeCount(userTemplateId: number):Promise<LikeCount>{
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }
}