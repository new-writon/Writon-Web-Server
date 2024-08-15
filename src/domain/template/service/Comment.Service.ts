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
import { sortCompanyPublic } from "../util/data.js";
import { formatDate } from "../util/date.js";

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
        return commentData.length === 0 ? [] : this.processCommentData(commentData)
        
        // // 댓글 정보를 통해 유저 챌린지 id 배열 조회
        // const userChallengeIdArray = this.dataMapperService.getUserChallengeIdMapper(commentData);
        // // 유저 챌린지 id를 통해 글 작성자 정보 조회
        // const templateWriteAffiliationData = await this.userApi.requestAffilaitonWithChallengeIdArray(userChallengeIdArray);
        // // 함수 매핑
        // const myComment = this.dataMapperService.makeMyCommentMapper(templateWriteAffiliationData, commentData);
        // return MyComment.of(myComment);
    }

    private async processCommentData(commentData: Comment[]): Promise<MyComment[]> {
        const userChallengeIdArray = this.dataMapperService.getUserChallengeIdMapper(commentData);
        const templateWriteAffiliationData = await this.userApi.requestAffilaitonWithChallengeIdArray(userChallengeIdArray);
        const myComment = this.dataMapperService.makeMyCommentMapper(templateWriteAffiliationData, commentData);
        return MyComment.of(myComment);
    }

    public async bringCommentInformation(userId:number, organization:string, userTemplateId:number):Promise<CommentWithReplies[]|[]>
    {
        // userTemplateId에 있는 댓글 정보 모두 조회
        const commentDatas = await this.commentHelper.giveCommentByUserTemplateId(userTemplateId);
        return commentDatas.length === 0 ? []:this.proccessCommentInformationData(userId, organization, commentDatas)
    //     // 내 정보 가져오기
    //     const myAffiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
    //     // 댓글 개수 검증하기
    //   //  this.templateVerifyService.verifyCommentCount(commentDatas)
    //     console.log(2)
    //     // affiliationId 추출
    //     const extractedAffiliationIds = this.extractAffiliationId(commentDatas)
    //     // affiliationId 기반 데이터 조회
    //     const affiliationDatas = await this.userApi.requestAffiliationAndUserById(extractedAffiliationIds);
    //     // 같은 affiliationId끼리 묶기
    //     const mergedCommentInformation = this.mergeCommentAndAffiliationForCommentInformation(commentDatas, affiliationDatas, myAffiliationData);
    //     const sortedCompanyData = sortCompanyPublic(mergedCommentInformation) as CommentInformation[];
    //     const customedCommentData = this.commentDataCustom(sortedCompanyData);
    //     return customedCommentData 
    }

    private async proccessCommentInformationData(userId:number, organization:string, commentDatas:Comment[]){
        // 내 정보 가져오기
        const myAffiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        // 댓글 개수 검증하기
      //  this.templateVerifyService.verifyCommentCount(commentDatas)
        // affiliationId 추출
        const extractedAffiliationIds = this.extractAffiliationId(commentDatas)
        // affiliationId 기반 데이터 조회
        const affiliationDatas = await this.userApi.requestAffiliationAndUserById(extractedAffiliationIds);
        // 같은 affiliationId끼리 묶기
        const mergedCommentInformation = this.mergeCommentAndAffiliationForCommentInformation(commentDatas, affiliationDatas, myAffiliationData);
        const sortedCompanyData = sortCompanyPublic(mergedCommentInformation) as CommentInformation[];
        const customedCommentData = this.commentDataCustom(sortedCompanyData);
        return customedCommentData 
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
            return CommentInformation.of(matchedAffiliationData.getPosition(), matchedAffiliationData.getCompany(), matchedAffiliationData.getCompanyPublic(),
                    matchedAffiliationData.getUser().getProfileImage(),commentData.getId(), matchedAffiliationData.getNickname(),
                    commentData.getUserTemplateId(), commentData.getContent(), this.commentDateFormat(String(commentData.getCreatedAt())), myAffiliationId, String(commentData.getCommentGroup())
        )});
    }

    private commentDataCustom = (commentData: CommentInformation[]): CommentWithReplies[] => {
        const result: CommentWithReplies[] = [];
        commentData.forEach((comment: CommentInformation) => {
            const existingComment = this.findExistingComment(result, comment);
    
            if (existingComment) {
                this.addReplyToExistingComment(existingComment, comment);
            } else if (comment.getCommentGroup() === '-1') {
                const mainComment = this.createMainComment(comment);
                mainComment.reply = this.findRepliesForComment(commentData, comment);
                result.push(mainComment);
            }
        });
        return result;
    };
    
    private findExistingComment = (result: CommentWithReplies[], comment: CommentInformation): CommentWithReplies | undefined => {
        return result.find(
            (item) => item.commentGroup === '-1' && item.commentId === String(comment.getCommentId())
        );
    };
    
    private addReplyToExistingComment = (existingComment: CommentWithReplies, comment: CommentInformation): void => {
        const reply = this.createCommentReply(comment);
        existingComment.reply.push(reply);
    };
    
    private createMainComment = (comment: CommentInformation): CommentWithReplies => {
        return {
            position: comment.getJob(),
            company: comment.getCompany(),
            companyPublic: Number(comment.getCompanyPublic()),
            profile: comment.getProfile(),
            commentId: String(comment.getCommentId()),
            nickname: comment.getNickname(),
            commentGroup: comment.getCommentGroup(),
            userTempleteId: comment.getUserTempleteId(),
            myCommentSign: !!comment.getMyCommentSign(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
            reply: [],
        };
    };
    
    private createCommentReply = (comment: CommentInformation): CommentWithReplies => {
        return {
            position: comment.getJob(),
            company: comment.getCompany(),
            companyPublic: Number(comment.getCompanyPublic()),
            profile: comment.getProfile(),
            commentId: String(comment.getCommentId()),
            nickname: comment.getNickname(),
            commentGroup: comment.getCommentGroup(),
            userTempleteId: comment.getUserTempleteId(),
            myCommentSign: !!comment.getMyCommentSign(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
            reply: [],
        };
    };
    
    private findRepliesForComment = (commentData: CommentInformation[], comment: CommentInformation): CommentWithReplies[] => {
        return commentData
            .filter((reply) => reply.getCommentGroup() !== '-1' && reply.getCommentGroup() === String(comment.getCommentId()))
            .map((reply) => this.createCommentReply(reply));
    };


    private commentDateFormat(date:string){
        return formatDate(date)
    }

    
}