import { Comment } from "../domain/entity/Comment.js";
import { UserTemplete } from "../domain/entity/UserTemplete.js";



export class CommentAndUserTemplate {
    createdAt: Date;
    updatedAt: Date;
    commentId: number;
    commentGroup: number;
    userTempleteId: number;
    affiliationId: number;
    content: string;
    check: number;
    userTemplete: UserTemplete;


    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    getCommentId(): number {
        return this.commentId;
    }

    getCommentGroup(): number {
        return this.commentGroup;
    }

    getUserTempleteId(): number {
        return this.userTempleteId;
    }

    getAffiliationId(): number {
        return this.affiliationId;
    }

    getContent(): string {
        return this.content;
    }

    getCheck(): number {
        return this.check;
    }

    getUserTemplete(): UserTemplete {
        return this.userTemplete;
    }
}