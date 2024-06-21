import { Repository } from "typeorm";
import { Comment } from "../entity/Comment.js";
import { CommentAndUserTemplate } from "../../interface/EntitiyCustom.interface.js";



export interface CommentRepository extends Repository<Comment> {

    findCommentByAffiliationIdWithChallengeId(affiliationId: number,challengeId:number): Promise<Comment[]>;
    updateCommentCheck(commentId: number):Promise<void>;
    findCommentById(commentId:number):Promise<Comment>;
    findCommentWithUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId:number): Promise<Comment[]>;
    insertComment(affiliationId:number, content:string, userTemplateId:number, commentGroup:number):Promise<Comment>;
    updateComment(affilationId:number, commentId: number, content: string):Promise<void>;
    deleteComment(affilationId:number, commentId: number):Promise<void>;
    

}