import { Inject, Injectable } from "@nestjs/common";
import { CommentRepository } from "../domain/repository/Comment.Repository.js";
import { Comment } from "../domain/entity/Comment.js";
import { CommentAndUserTemplate } from "../interface/EntitiyCustom.interface.js";


@Injectable()
export class CommentHelper{

    constructor(
        @Inject('commentImpl')
        private readonly commentRepository: CommentRepository
    ){}


    public async giveCommentByAffiliationIdWithChallengeId(affilationId:number,challengeId:number):Promise<Comment[]>{
        return this.commentRepository.findCommentByAffiliationIdWithChallengeId(affilationId, challengeId);
    }

    public async executeUpdateCommentCheck(commentId: number):Promise<void>{
        return this.commentRepository.updateCommentCheck(commentId);
    }
}