import { Inject, Injectable } from "@nestjs/common";
import { CommentRepository } from "../domain/repository/Comment.Repository";
import { Comment } from "../domain/entity/Comment";
import { TemplateVerifyService } from "../domain/service/TemplateVerify.Service";


@Injectable()
export class CommentHelper{

    constructor(
        @Inject('commentImpl')
        private readonly commentRepository: CommentRepository,
        private readonly templateVerifyService:TemplateVerifyService
    ){}


    public async giveCommentByAffiliationIdWithChallengeId(affilationId:number,challengeId:number, verifyFlag:boolean):Promise<Comment[]>{
        const datas = await this.commentRepository.findCommentByAffiliationIdWithChallengeId(affilationId, challengeId);
        if(verifyFlag) this.templateVerifyService.verifyComments(datas);
        return datas;
    }

    public async executeUpdateCommentCheck(commentId: number):Promise<void>{
        return this.commentRepository.updateCommentCheck(commentId);
    }

    public async giveCommentWithUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId:number, verifyFlag:boolean): Promise<Comment[]>{
        const datas = await this.commentRepository.findCommentWithUserIdAndOrganizationAndChallengeId(userId, organization, challengeId);
        if(verifyFlag) this.templateVerifyService.verifyComments(datas);
        return datas;
    }

    public async giveCommentById(commentId:number, verifyFlag:boolean):Promise<Comment>{
        const data = await this.commentRepository.findCommentById(commentId);
        if(verifyFlag) this.templateVerifyService.verifyComment(data);
        return data;
    }

    public async executeInsertComment(affiliationId:number, content:string, userTemplateId:number, commentGroup:number):Promise<Comment>{
        return this.commentRepository.insertComment(affiliationId, content, userTemplateId, commentGroup);
    }

    public async executeUpdateComment(affilationId:number, commentId: number, content: string):Promise<void>{
        const commentData = await this.commentRepository.findCommentById(commentId);
        this.templateVerifyService.verifyComment(commentData);
        return this.commentRepository.updateComment(affilationId, commentId, content);
    }

    public async executeDeleteComment(affilationId:number, commentId: number):Promise<void>{
        const commentData = await this.commentRepository.findCommentById(commentId);
        this.templateVerifyService.verifyComment(commentData);
        return this.commentRepository.deleteComment(affilationId, commentId);
    }

    public async giveCommentByUserTemplateId(userTemplateId:number, verifyFlag:boolean):Promise<Comment[]>{
        const datas = await this.commentRepository.findCommentByUserTemplateId(userTemplateId);
        if(verifyFlag) this.templateVerifyService.verifyComments(datas);
        return datas;
    }
}