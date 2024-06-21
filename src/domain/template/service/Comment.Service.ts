import { Injectable } from "@nestjs/common";
import { CommentHelper } from "../helper/Comment.Helper.js";
import { UserApi } from "../infrastructure/User.Api.js";
import { DataMapperService } from "../domain/service/DataMappper.Service.js";
import { MyComment } from "../dto/response/MyComment.js";
import { CommentId } from "../dto/response/CommentId.js";

@Injectable()
export class CommentService{

    constructor(
        private readonly commentHelper: CommentHelper,
        private readonly userApi: UserApi,
        private readonly dataMapperService: DataMapperService,
    ){}


    public async bringCommentAccordingToOrganizationAndChallengeId(userId:number, organization:string, challengeId: number):Promise<MyComment[]>{
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
        console.log(templateWriteAffiliationData)
        // 함수 매핑
        const myComment = this.dataMapperService.makeMyCommentMapper(templateWriteAffiliationData, commentData);
        return MyComment.of(myComment);
    }


    public async checkComment(commentId:number){
        await this.commentHelper.executeUpdateCommentCheck(commentId);
    }


    public async addComment(userId: number, organization: string, userTemplateId: number, content: string, commentGroup: number){
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const commentData = await this.commentHelper.executeInsertComment(affiliationData.getAffiliationId(), content, userTemplateId, commentGroup);
        return CommentId.of(commentData.getId());   
    }




}