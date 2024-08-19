import { InternalServerErrorException } from "@nestjs/common";


export class ParticularSmallTalkCommentData{


    public smallTalkCommentId:number;
    public content: string;
    public createdTime: string;
    public affiliationId:number;


    constructor(
        smallTalkCommentId:number,
        content: string,
        createdTime: string,
        affiliationId:number
    ){
            this.setSmallTalkCommentId(smallTalkCommentId);
            this.setContent(content);
            this.setCreatedTime(createdTime);
            this.setAffiliationId(affiliationId)
        }


    private setSmallTalkCommentId(smallTalkCommentId: number) {
        if (smallTalkCommentId === undefined || smallTalkCommentId === null) 
            throw new InternalServerErrorException(`${__dirname} : smallTalkCommentId 값이 존재하지 않습니다.`);
        this.smallTalkCommentId=smallTalkCommentId;
    }

    private setContent(content: string) {
        if (!content) 
            throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
        
        this.content = content;
    }

    private setCreatedTime(createdTime: string) {
        if (!createdTime) 
            throw new InternalServerErrorException(`${__dirname} : createdTime 값이 존재하지 않습니다.`);
        this.createdTime = createdTime;
    }

    private setAffiliationId(affiliationId: number) {
        if (!affiliationId) 
            throw new InternalServerErrorException(`${__dirname} : affiliationId 값이 존재하지 않습니다.`);
        this.affiliationId=affiliationId;
    }

    public getSmallTalkCommentId(){
        return this.smallTalkCommentId;
    }

    public getContent(){
        return this.content;
    }

    public getCreatedTime(){
        return this.createdTime;
    }

    public getAffiliationId(){
        return this.affiliationId;
    }

}