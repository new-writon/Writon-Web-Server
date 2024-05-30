import { Injectable } from "@nestjs/common";
import { LikeHelper } from "../helper/Like.Helper.js";

@Injectable()
export class LikeServie{

    constructor(
        private readonly likeHelper:LikeHelper
    ){}


    public async checkLike(likeId: number){
        await this.likeHelper.executeUpdateLikeCheck(likeId);
    }
}