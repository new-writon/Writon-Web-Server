import { Injectable } from "@nestjs/common";
import { AgoraCommentHelper } from "../helper/SmallTalkComment.Helper.js";
import { UserApi } from "../infrastructure/User.Api.js";
import { AgoraCommentRead } from "../dto/response/AgoraCommentRead.js";
import { ParticularAgoraCommentData } from "../dto/ParticularAgoraCommentData.js";
import { Affiliation } from "src/domain/user/domain/entity/Affiliation.js";


@Injectable()
export class AgoraCommentService{

    constructor(
        private readonly agoraCommentHelper: AgoraCommentHelper,
        private readonly userApi: UserApi
    ){}


    public async penetrateAgoraComment(
        userId: number,
        agoraId: number,
        organization: string,
        agoraComment: string
    ):Promise<void>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        await this.agoraCommentHelper.executeInsertAgoraComment(agoraId, affiliationData.getId(), agoraComment);
    }


    public async bringAgoraCommentRead(
        userId: number,
        agoraId: number
    ):Promise<AgoraCommentRead[]>{
        const agoraCommentData = await this.agoraCommentHelper.giveAgoraCommentByAgoraId(agoraId);
        return agoraCommentData.length === 0 ? []:this.proccessAgoraCommentData(agoraCommentData, userId);

        // const extractedAffiliationId = this.extractAffiliationId(agoraCommentData);
        // const affiliationData = await this.userApi.requestAffiliationAndUserById(extractedAffiliationId);
        // const mergedParticularAgoraComment = this.mergeParticularAgoraComment(agoraCommentData, affiliationData, userId);
        // return AgoraCommentRead.of(mergedParticularAgoraComment);

    }

    private async proccessAgoraCommentData(agoraCommentData:ParticularAgoraCommentData[], userId:number){
        const extractedAffiliationId = this.extractAffiliationId(agoraCommentData);
        const affiliationData = await this.userApi.requestAffiliationAndUserById(extractedAffiliationId);
        const mergedParticularAgoraComment = this.mergeParticularAgoraComment(agoraCommentData, affiliationData, userId);
        return AgoraCommentRead.of(mergedParticularAgoraComment);
    }

    private extractAffiliationId(particularCommentData: ParticularAgoraCommentData[]){
        return particularCommentData.map((particularCommentData)=> particularCommentData.getAffiliationId())
    }

    private mergeParticularAgoraComment(particularCommentData: ParticularAgoraCommentData[], affiliationData:Affiliation[], userId:number):AgoraCommentRead[]{
        return affiliationData.flatMap((affiliationData) => {
            return particularCommentData.filter((particularCommentData) => affiliationData.getId() === particularCommentData.getAffiliationId())
            .map((particularCommentData) => {
                const distinguishedUser = this.distinguishUser(affiliationData.user.getId(), userId);
                return new AgoraCommentRead(
                    particularCommentData.getAgoraCommentId(),
                    particularCommentData.getContent(),
                    affiliationData.getNickname(),
                    affiliationData.user.getProfileImage(),
                    particularCommentData.getCreatedTime(),
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