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

    public async executeInsertLike(affiliationId:number, userTemplateId:number):Promise<Likes>{
        return this.likeRepository.insertLike(affiliationId, userTemplateId);
    }

    public async giveLikeCountByUserTemplateId(userTemplateId:number):Promise<number>{
        return this.likeRepository.findLikeCountByUserTemplateId(userTemplateId);
    }



}