import { Inject, Injectable } from "@nestjs/common";
import { SmallTalkCommentRepository} from "../domain/repository/SmallTalkComment.Repository.js";
import { ParticularAgoraCommentData } from "../dto/ParticularAgoraCommentData.js";
import { AgoraVerifyService } from "../domain/service/AgoraVerify.Service.js";

@Injectable()
export class AgoraCommentHelper{

    constructor(
        @Inject("agoraCommentImpl")
        private readonly agoraCommentRepository: SmallTalkCommentRepository,
        private readonly agoraVerifyService:AgoraVerifyService
    ){}

    public async executeInsertAgoraComment(agoraId:number, affiliationId:number, agoraComment:string):Promise<void>{
        return this.agoraCommentRepository.insertAgoraComment(agoraId, affiliationId, agoraComment);
    }

    public async giveAgoraCommentByAgoraId(agoraId:number):Promise<ParticularAgoraCommentData[]>{
        const particularCommentData = await this.agoraCommentRepository.findAgoraCommentByAgoraId(agoraId);
     //   this.agoraVerifyService.verifyParticularAgoraComment(particularCommentData);
        return particularCommentData;
    }

}