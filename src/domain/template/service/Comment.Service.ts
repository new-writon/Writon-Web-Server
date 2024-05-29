import { Injectable } from "@nestjs/common";
import { CommentHelper } from "../helper/Comment.Helper.js";
import { UserApi } from "../infrastructure/User.Api.js";
import { DataMapperService } from "../domain/service/DataMappper.Service.js";

@Injectable()
export class CommentService{

    constructor(
        private readonly commentHelper: CommentHelper,
        private readonly userApi: UserApi,
        private readonly dataMapperService: DataMapperService,

    ){}


    public async bringCommentAccordingToOrganizationAndChallengeId(userId:number, organization:string, challengeId: number){
        // 댓글 작성자 정보 조회
        const commentWriteAffiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        console.log(commentWriteAffiliationData)
        // 댓글 정보, 해당 템플릿 정보 조회
        const commentData = await this.commentHelper.giveCommentByAffiliationIdWithChallengeId(commentWriteAffiliationData.getAffiliationId(), challengeId);
        console.log(commentData)
        // 댓글 정보를 통해 유저 챌린지 id 배열 조회
        const userChallengeIdArray = this.dataMapperService.getUserChallengeIdMapper(commentData);
        console.log(userChallengeIdArray)
        // 유저 챌린지 id를 통해 글 작성자 정보 조회
        const templateWriteAffiliationData = await this.userApi.requestAffilaitonWithChallengeIdArray(userChallengeIdArray);
        console.log(templateWriteAffiliationData[0].userChallenges[0])





    }



}