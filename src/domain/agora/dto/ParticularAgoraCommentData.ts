import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class ParticularAgoraCommentData{


    public agora_comment_id:number;
    public content: string;
    public created_time: string;
    public affiliation_id:number;


    constructor(
        agora_comment_id:number,
        content: string,
        created_time: string,
        affiliation_id:number
    ){
            this.setAgoraCommentId(agora_comment_id);
            this.setContent(content);
            this.setCreatedTime(created_time);
            this.setAffiliationId(affiliation_id)
        }


    private setAgoraCommentId(agoraCommentId: number) {
        if (agoraCommentId === undefined || agoraCommentId === null) 
            throw new InternalServerErrorException(`${__dirname} : agoraCommentId 값이 존재하지 않습니다.`);
    
        this.agora_comment_id = agoraCommentId;
    }

    private setContent(content: string) {
        if (!content) 
            throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
        
        this.content = content;
    }

    private setCreatedTime(createdTime: string) {
        if (!createdTime) 
            throw new InternalServerErrorException(`${__dirname} : createdTime 값이 존재하지 않습니다.`);
        this.created_time = createdTime;
    }

    private setAffiliationId(affiliationId: number) {
        if (!affiliationId) 
            throw new InternalServerErrorException(`${__dirname} : affiliationId 값이 존재하지 않습니다.`);
        this.affiliation_id=affiliationId;
    }

    public getAgoraCommentId(){
        return this.agora_comment_id;
    }

    public getContent(){
        return this.content;
    }

    public getCreatedTime(){
        return this.created_time;
    }

    public getAffiliationId(){
        return this.affiliation_id;
    }

}