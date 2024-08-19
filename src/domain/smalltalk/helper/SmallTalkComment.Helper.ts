import { Inject, Injectable } from "@nestjs/common";
import { SmallTalkCommentRepository} from "../domain/repository/SmallTalkComment.Repository";
import { ParticularSmallTalkCommentData } from "../dto/values/ParticularSmallTalkCommentData";
import { SmallTalkVerifyService } from "../domain/service/SmallTalkVerify.Service";

@Injectable()
export class SmallTalkCommentHelper{

    constructor(
        @Inject("smallTalkCommentImpl")
        private readonly smallTalkCommentRepository: SmallTalkCommentRepository,
        private readonly smallTalkVerifyService:SmallTalkVerifyService
    ){}

    public async executeInsertSmallTalkComment(smallTalkId:number, affiliationId:number, smallTalkComment:string):Promise<void>{
        return this.smallTalkCommentRepository.insertSmallTalkComment(smallTalkId, affiliationId, smallTalkComment);
    }

    public async giveSmallTalkCommentBySmallTalkId(smallTalkId:number):Promise<ParticularSmallTalkCommentData[]>{
        const particularCommentData = await this.smallTalkCommentRepository.findSmallTalkCommentBySmallTalkId(smallTalkId);
     //   this.agoraVerifyService.verifyParticularAgoraComment(particularCommentData);
        return particularCommentData;
    }

}