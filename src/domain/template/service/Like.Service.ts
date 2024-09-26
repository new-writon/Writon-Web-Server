import { Injectable } from "@nestjs/common";
import { LikeHelper } from "../helper/Like.Helper";
import { UserApi } from "../infrastructure/User.Api";
import { LikeCount } from "../dto/response/LikeCount";
import { TemplateVerifyService } from "../../../global/exception/template/TemplateVerify.Service";
import { MutexAlgorithm } from "../../../global/decorator/mutex";
import { UserVerifyService } from "src/global/exception/user/UserVerify.Service";
import { DataMapperService } from "../domain/service/DataMappper.Service";
import { Affiliation } from "src/domain/user/domain/entity/Affiliation";
import { LikeClickedUser } from "../dto/values/LikeClickedUser";

@Injectable()
export class LikeServie{

    constructor(
        private readonly likeHelper:LikeHelper,
        private readonly userApi:UserApi,
        private readonly templateVerifyService:TemplateVerifyService,
        private readonly userVerifyService:UserVerifyService,
        private readonly dataMapperService:DataMapperService
    ){}


    public async checkLike(likeId: number){
        await this.likeHelper.executeUpdateLikeCheck(likeId);
    }

    @MutexAlgorithm()
    public async penetrateLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        // 검증하기
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        this.userVerifyService.verifyAffiliation(affiliationData);
        const likeData = await this.likeHelper.giveLikeByAffiliationIdAndUserTemplateId(affiliationData.getAffiliationId(), userTemplateId);
        this.templateVerifyService.verifyExistLike(likeData);
        await this.likeHelper.executeInsertLike(affiliationData.getAffiliationId(), userTemplateId);
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }


    public async eraseLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        await this.likeHelper.executeDeleteLike(affiliationData.getAffiliationId(), userTemplateId);
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }

    public async bringLikeCount(userTemplateId: number):Promise<LikeCount>{
        const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
        return LikeCount.of(likeCount);
    }

    public async bringLikeClickedUser(userTemplateId: number){
        const likeDatas = await this.likeHelper.giveLikesByUserTemplateId(userTemplateId);
        const extractedAffiliationIds = this.dataMapperService.extractAffiliationId(likeDatas);
        const affiliationDatas = await this.userApi.requestAffiliationAndUserById(extractedAffiliationIds);
        return this.mappedClickedUser(affiliationDatas);  
    }

    private mappedClickedUser(affiliationDatas:Affiliation[]){
        return affiliationDatas.map((affiliationData)=>{
            return LikeClickedUser.of(affiliationData.getUser().getProfileImage(), affiliationData.getNickname());
        })
    }
}