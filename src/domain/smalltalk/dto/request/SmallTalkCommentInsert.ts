import { IsNotEmpty } from "class-validator";

export class SmallTalkCommentInsert{

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private smallTalkId:number;

    @IsNotEmpty()
    private smallTalkComment:string;

    public getOragnization(){
        return this.organization;
    }


    public getSmallTalkId(){
        return this.smallTalkId;
    }

    public getSmallTalkComment(){
        return this.smallTalkComment;
    }
}