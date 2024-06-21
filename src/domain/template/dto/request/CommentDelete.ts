import { IsNotEmpty } from "class-validator";


export class CommentDelete{

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private commentId:number;


    public getOrganization(){
        return this.organization;
    }

    public getCommentId(){
        return this.commentId;
    }

}