
import { InternalServerErrorException } from "@nestjs/common";
import { UserTemplate } from "../../domain/entity/UserTemplate";



export class LikeClickedUser {

    private userProfileImage:string;
    private nickname:string;

    constructor(userProfileImage:string, nickname:string){

    }

    public static of(userProfileImage:string, nickname:string){
        return new LikeClickedUser(userProfileImage, nickname);
    }

    private setUserProfileImage(userProfileImage:string){
        if (userProfileImage=== null) throw new InternalServerErrorException(`${__dirname} : userProfileImage 값이 존재하지 않습니다.`);
        this.userProfileImage=userProfileImage;
    }

    private setNickname(nickname:string){
        if (nickname === null) throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname=nickname;
    }

 
}