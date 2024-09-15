import { Injectable } from "@nestjs/common";
import { SmallTalkCommentHelper } from "../helper/SmallTalkComment.Helper";
import { UserApi } from "../infrastructure/User.Api";
import { SmallTalkCommentRead } from "../dto/response/SmallTalkCommentRead";
import { ParticularSmallTalkCommentData } from "../dto/values/ParticularSmallTalkCommentData";
import { Affiliation } from "src/domain/user/domain/entity/Affiliation";


@Injectable()
export class SmallTalkCommentService{

    constructor(
        private readonly smallTalkCommentHelper: SmallTalkCommentHelper,
        private readonly userApi: UserApi
    ){}


    public async penetrateSmallTalkComment(
        userId: number,
        smallTalkId: number,
        organization: string,
        agoraComment: string
    ):Promise<void>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        await this.smallTalkCommentHelper.executeInsertSmallTalkComment(smallTalkId, affiliationData.getId(), agoraComment);
    }


    public async bringSmallTalkCommentRead(
        userId: number,
        smallTalkId: number
    ):Promise<SmallTalkCommentRead[]>{
        const agoraCommentData = await this.smallTalkCommentHelper.giveSmallTalkCommentBySmallTalkId(smallTalkId);
        return agoraCommentData.length === 0 ? []:this.proccessSmallTalkCommentData(agoraCommentData, userId);
    }

    private async proccessSmallTalkCommentData(smallTalkCommentData:ParticularSmallTalkCommentData[], userId:number){
        const extractedAffiliationId = this.extractAffiliationId(smallTalkCommentData);
        const affiliationData = await this.userApi.requestAffiliationAndUserById(extractedAffiliationId);
        return this.mergeParticularSmallTalkComment(smallTalkCommentData, affiliationData, userId);
    }

    private extractAffiliationId(particularCommentData: ParticularSmallTalkCommentData[]){
        return particularCommentData.map((particularCommentData)=> particularCommentData.getAffiliationId())
    }

    private mergeParticularSmallTalkComment(particularCommentData: ParticularSmallTalkCommentData[], affiliationData:Affiliation[], userId:number):SmallTalkCommentRead[]{
        return affiliationData.flatMap((affiliationData) => {
            return particularCommentData.filter((particularCommentData) => affiliationData.getId() === particularCommentData.getAffiliationId())
            .map((particularCommentData) => {
                const distinguishedUser = this.distinguishUser(affiliationData.user.getId(), userId);
                return SmallTalkCommentRead.of(
                    particularCommentData,
                    affiliationData.getNickname(),
                    affiliationData.user.getProfileImage(),
                    distinguishedUser   
                )});  
        });
    }


    private distinguishUser(relativeUserId:number, relativedUserId: number): string{
        if(relativeUserId === relativedUserId){
            return '1'
        }
        return '0'
    }
}