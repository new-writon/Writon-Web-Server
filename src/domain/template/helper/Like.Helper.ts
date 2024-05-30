import { Inject, Injectable } from "@nestjs/common";
import { LikeRepository } from "../domain/repository/Like.Repository.js";

@Injectable()
export class LikeHelper{

    constructor(
        @Inject('likeImpl')
        private readonly likeRepository:LikeRepository
    ){}

    public async executeUpdateLikeCheck(likeId:number):Promise<void>{
        return this.likeRepository.updateLikeCheck(likeId);
    }



}