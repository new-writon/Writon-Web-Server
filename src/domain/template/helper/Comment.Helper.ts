import { Inject, Injectable } from "@nestjs/common";
import { CommentRepository } from "../domain/repository/Comment.Repository.js";
import { Comment } from "../domain/entity/Comment.js";
import { TemplateVerifyService } from "../domain/service/TemplateVerify.Service.js";


@Injectable()
export class CommentHelper{

    constructor(
        @Inject('commentImpl')
        private readonly commentRepository: CommentRepository,
        private readonly templateVerifyService:TemplateVerifyService
    ){}


    public async giveCommentByAffiliationIdWithChallengeId(affilationId:number,challengeId:number):Promise<Comment[]>{
        const commentData = await this.commentRepository.findCommentByAffiliationIdWithChallengeId(affilationId, challengeId);
        this.templateVerifyService.verifyComment(commentData[0]);
        return commentData;
    }

    public async executeUpdateCommentCheck(commentId: number):Promise<void>{
        return this.commentRepository.updateCommentCheck(commentId);
    }

    public async giveCommentWithUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId:number): Promise<Comment[]>{
        return this.commentRepository.findCommentWithUserIdAndOrganizationAndChallengeId(userId, organization, challengeId);
    }

    public async giveCommentById(commentId:number):Promise<Comment>{
        return this.commentRepository.findCommentById(commentId);
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

    public async giveCommentByUserTemplateId(userTemplateId:number):Promise<Comment[]>{
        return this.commentRepository.findCommentByUserTemplateId(userTemplateId);
    }
}