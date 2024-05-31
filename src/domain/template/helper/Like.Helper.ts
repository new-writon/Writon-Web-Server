import { Inject, Injectable } from "@nestjs/common";
import { LikeRepository } from "../domain/repository/Like.Repository.js";
import { Likes } from "../domain/entity/Likes.js";

@Injectable()
export class LikeHelper{

    constructor(
        @Inject('likeImpl')
        private readonly likeRepository:LikeRepository
    ){}

    public async executeUpdateLikeCheck(likeId:number):Promise<void>{
        return this.likeRepository.updateLikeCheck(likeId);
    }

    public async giveLikeWithUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId:number): Promise<Likes[]>{
        return this.likeRepository.findLikeWithUserIdAndOrganizationAndChallengeId(userId, organization, challengeId);

    }



}