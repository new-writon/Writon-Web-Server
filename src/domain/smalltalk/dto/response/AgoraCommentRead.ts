import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class AgoraCommentRead{

    private agora_comment_id: number;
    private content: string;
    private nickname: string;
    private profile: string;
    private created_time: string;
    private myCommentSign:string;


    constructor(
        agora_comment_id: number,
        content: string,
        nickname: string,
        profile: string,
        created_time: string,
        myCommentSign:string
    ){
        this.setAgoraCommentId(agora_comment_id);
        this.setContent(content);
        this.setNickname(nickname);
        this.setProfile(profile);
        this.setCreatedTime(created_time);
        this.setMyCommentSign(myCommentSign);
    }


    public static of(agoraCommentRead: AgoraCommentRead[]){
        return agoraCommentRead.map((data)=> new AgoraCommentRead(data.agora_comment_id, data.content, data.nickname, data.profile, data.created_time, data.myCommentSign)); 
    }


    private setAgoraCommentId(agoraCommentId: number) {
        if (agoraCommentId === undefined || agoraCommentId === null) {
            throw new InternalServerErrorException(`${__dirname} : agoraCommentId 값이 존재하지 않습니다.`);
        }
        this.agora_comment_id = agoraCommentId;
    }

    private setContent(content: string) {
        if (!content) {
            throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
        }
        this.content = content;
    }

    private setNickname(nickname: string) {
        if (!nickname) {
            throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        }
        this.nickname = nickname;
    }

    private setProfile(profile: string) {
        this.profile = profile;
    }

    private setCreatedTime(createdTime: string) {
        if (!createdTime) {
            throw new InternalServerErrorException(`${__dirname} : createdTime 값이 존재하지 않습니다.`);
        }
        this.created_time = createdTime;
    }

    private setMyCommentSign(myCommentSign: string) {
        if (!myCommentSign) {
            throw new InternalServerErrorException(`${__dirname} : myCommentSign 값이 존재하지 않습니다.`);
        }
        this.myCommentSign = myCommentSign;
    }

    
}