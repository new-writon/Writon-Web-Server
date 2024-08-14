import { IsNotEmpty } from "class-validator";

export class AgoraCommentInsert{

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private agoraId:number;

    @IsNotEmpty()
    private agoraComment:string;

    public getOragnization(){
        return this.organization;
    }


    public getAgoraId(){
        return this.agoraId;
    }

    public getAgoraComment(){
        return this.agoraComment;
    }
}