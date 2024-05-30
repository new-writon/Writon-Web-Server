import { IsNotEmpty } from "class-validator";


export class CommentUpdate{

    @IsNotEmpty()
    private commentId: number;

    public getCommentId(){
        return this.commentId;
    }
}