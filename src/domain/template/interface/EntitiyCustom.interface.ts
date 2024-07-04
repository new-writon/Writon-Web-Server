import { Comment } from "../domain/entity/Comment.js";
import { UserTemplate } from "../domain/entity/UserTemplate.js";


export interface CommentAndUserTemplate{
    comment: Comment;
    userTemplate: UserTemplate
}