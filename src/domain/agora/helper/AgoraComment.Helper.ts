import { Inject, Injectable } from "@nestjs/common";
import { AgoraCommentRepository } from "../domain/repository/AgoraComment.Repository.js";

@Injectable()
export class AgoraCommentHelper{

    constructor(
        @Inject("agoraCommentImpl")
        private readonly agoraCommentRepository: AgoraCommentRepository
    ){}

    public async executeInsertAgoraComment(agoraId:number, affiliationId:number, agoraComment:string):Promise<void>{
        return this.agoraCommentRepository.insertAgoraComment(agoraId, affiliationId, agoraComment);
    }

}