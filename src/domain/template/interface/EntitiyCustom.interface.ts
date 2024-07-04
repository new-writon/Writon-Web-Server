import { Comment } from "../domain/entity/Comment.js";
import { UserTemplete } from "../domain/entity/UserTemplate.js";


export interface CommentAndUserTemplate{
    comment: Comment;
    userTemplate: UserTemplete
}