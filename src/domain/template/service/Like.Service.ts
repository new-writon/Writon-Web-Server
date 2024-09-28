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
import { Likes } from "../domain/entity/Likes";
import { AlarmService } from "src/global/alarm/Alarm.Service";
import { UserTemplateHelper } from "../helper/UserTemplate.Helper";
import { Transactional } from "../../../global/decorator/transaction";
import { DataSource } from "typeorm";
import { formatDateToPushAlarmStatus } from "../util/date";


@Injectable()
export class LikeServie{

    constructor(
        private readonly dataSource:DataSource,
        private readonly likeHelper:LikeHelper,
        private readonly userApi:UserApi,
        private readonly userVerifyService:UserVerifyService,
        private readonly templateVerifyService:TemplateVerifyService,
        private readonly dataMapperService:DataMapperService,
        private readonly alarmService:AlarmService,
        private readonly userTemplateHelper:UserTemplateHelper
    ){}


    public async checkLike(likeId: number){
        await this.likeHelper.executeUpdateLikeCheck(likeId);
    }
  
    @Transactional()
    @MutexAlgorithm()
    public async penetrateLike(userId: number, userTemplateId: number,organization: string):Promise<LikeCount>{

        const [ affiliationData, userTemplateData] = await Promise.all([
            this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization),
            this.userTemplateHelper.findUserTemplateById(userTemplateId)
        ])
        const firebaseTokenDatas = await this.userApi.requestFirebaseTokenWithUserChallengeId(userTemplateData.getUserChallengeId())
        this.userVerifyService.verifyAffiliation(affiliationData);
        const checkLikeData = await this.likeHelper.giveLikeByAffiliationIdAndUserTemplateId(affiliationData.getAffiliationId(), userTemplateId);
        this.templateVerifyService.verifyExistLike(checkLikeData);
        await this.likeHelper.executeInsertLike(affiliationData.getAffiliationId(), userTemplateId); 
        this.alarmService.sendPushAlarm(firebaseTokenDatas.map((data)=> data.getEngineValue()), '좋아요 알림',`${affiliationData.getNickname()}님이  ${ formatDateToPushAlarmStatus(userTemplateData.getTemplateDate())} 템플릿에 좋아요를 눌렀습니다.` )
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
        return likeDatas.length === 0 ? [] : this.processLikeClickedLogic(likeDatas);
    }

    private async processLikeClickedLogic(likeDatas: Likes[]) {
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