import { Injectable } from "@nestjs/common";
import { CommentHelper } from "../helper/Comment.Helper.js";
import { UserApi } from "../infrastructure/User.Api.js";
import { DataMapperService } from "../domain/service/DataMappper.Service.js";
import { MyComment } from "../dto/response/MyComment.js";
import { CommentId } from "../dto/response/CommentId.js";
import { Comment } from "../domain/entity/Comment.js";
import { Affiliation } from "src/domain/user/domain/entity/Affiliation.js";
import { CommentInformation } from "../dto/response/CommentInformation.js";
import { TemplateVerifyService } from "../domain/service/TemplateVerify.Service.js";

@Injectable()
export class CommentService{

    constructor(
        private readonly commentHelper: CommentHelper,
        private readonly userApi: UserApi,
        private readonly dataMapperService: DataMapperService,
        private readonly templateVerifyService:TemplateVerifyService
    ){}


    public async bringMyComment(userId:number, organization:string, challengeId: number):Promise<MyComment[]>{
        // 댓글 작성자 정보 조회
        const commentWriteAffiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        // 댓글 정보, 해당 템플릿 정보 조회
        const commentData = await this.commentHelper.giveCommentByAffiliationIdWithChallengeId(commentWriteAffiliationData.getAffiliationId(), challengeId);
        // 댓글 정보를 통해 유저 챌린지 id 배열 조회
        const userChallengeIdArray = this.dataMapperService.getUserChallengeIdMapper(commentData);
        // 유저 챌린지 id를 통해 글 작성자 정보 조회
        const templateWriteAffiliationData = await this.userApi.requestAffilaitonWithChallengeIdArray(userChallengeIdArray);
        console.log(templateWriteAffiliationData)
        // 함수 매핑
        const myComment = this.dataMapperService.makeMyCommentMapper(templateWriteAffiliationData, commentData);
        return MyComment.of(myComment);
    }

    public async bringCommentInformation(userId:number, organization:string, userTemplateId:number):Promise<CommentInformation[]>{
        // userTemplateId에 있는 댓글 정보 모두 조회
        const commentDatas = await this.commentHelper.giveCommentByUserTemplateId(userTemplateId);
        // 내 정보 가져오기
        const myAffiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        // 댓글 개수 검증하기
        this.templateVerifyService.verifyCommentCount(commentDatas)
        // affiliationId 추출
        const extractedAffiliationIds = this.extractAffiliationId(commentDatas)
        // affiliationId 기반 데이터 조회
        const affiliationDatas = await this.userApi.requestAffiliationAndUserById(extractedAffiliationIds);
        // 같은 affiliationId끼리 묶기
        const mergedCommentInformation = this.mergeCommentAndAffiliationForCommentInformation(commentDatas, affiliationDatas, myAffiliationData);
        return mergedCommentInformation;
    }


    public async checkComment(commentId:number){
        await this.commentHelper.executeUpdateCommentCheck(commentId);
    }


    public async penetrateComment(userId: number, organization: string, userTemplateId: number, content: string, commentGroup: number):Promise<CommentId>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const commentData = await this.commentHelper.executeInsertComment(affiliationData.getAffiliationId(), content, userTemplateId, commentGroup);
        return CommentId.of(commentData.getId());   
    }

    public async modifyComment(userId: number, organization: string, commentId: number, content: string):Promise<void>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        await this.commentHelper.executeUpdateComment(affiliationData.getAffiliationId(), commentId, content);
    }

    public async eraseComment(userId: number, organization: string, commentId: number):Promise<void>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        await this.commentHelper.executeDeleteComment(affiliationData.getAffiliationId(), commentId);
    }

    private extractAffiliationId(commentDatas: Comment[]){
        return commentDatas.map((data)=>data.getAffiliationId());
    }

    private mergeCommentAndAffiliationForCommentInformation(commentDatas:Comment[], affiliationDatas:Affiliation[], myAffiliationData:Affiliation){
        return commentDatas.map((commentData)=>{
            const matchedAffiliationData = affiliationDatas.find((affiliationData)=> affiliationData.getAffiliationId() === commentData.getAffiliationId());
            const myAffiliationId = Number(myAffiliationData.getAffiliationId() === commentData.getAffiliationId());
            return CommentInformation.of(matchedAffiliationData.getJob(), matchedAffiliationData.getCompany(), matchedAffiliationData.getCompanyPublic(),
                    matchedAffiliationData.getUser().getProfileImage(),commentData.getId(), matchedAffiliationData.getNickname(),
                    commentData.getUserTemplateId(), commentData.getContent(), commentData.getCreatedAt(), myAffiliationId, String(commentData.getCommentGroup())
        )});
    }
}