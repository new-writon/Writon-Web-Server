import { Inject, Injectable } from "@nestjs/common";
import { UserApi } from "../infrastructure/User.Api.js";


@Injectable()
export class ResponseService{

    constructor(
        private readonly userApi: UserApi
    ){}




    public async checkReEngagement(userId:number,  organization:string, challengeId:number, check:boolean){
           await this.userApi.requestUpdateUserChallengeReEngagement(userId,organization, challengeId, check);
    }
    
}