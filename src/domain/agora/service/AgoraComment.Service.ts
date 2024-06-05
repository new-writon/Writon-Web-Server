import { Injectable } from "@nestjs/common";
import { AgoraCommentHelper } from "../helper/AgoraComment.Helper.js";
import { UserApi } from "../infrastructure/User.Api.js";


@Injectable()
export class AgoraCommentService{

    constructor(
        private readonly agoraCommentHelper: AgoraCommentHelper,
        private readonly userApi: UserApi
    ){}


    public async writeAgoraComment(
        userId: number,
        agoraId: number,
        organization: string,
        agoraComment: string
    ):Promise<void>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        await this.agoraCommentHelper.executeInsertAgoraComment(agoraId, affiliationData.getId(), agoraComment);
    }




}