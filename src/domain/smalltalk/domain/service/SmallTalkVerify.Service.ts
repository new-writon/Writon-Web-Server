import { Injectable } from "@nestjs/common";
import { checkData } from "../../util/checker.js";
import { ParticularSmallTalkData } from "../../dto/ParticularSmallTalkData.js";
import { SmallTalkException } from "../../exception/SmallTalkException.js";
import { SmallTalkErrorCode } from "../../exception/SmallTalkErrorCode.js";
import { ParticularSmallTalkCommentData } from "../../dto/ParticularSmallTalkCommentData.js";

@Injectable()
export class SmallTalkVerifyService{


    public verifyParticularAgora(particularSmallTalkData: ParticularSmallTalkData[]){
        if(!checkData(particularSmallTalkData[0]))
            throw new SmallTalkException(SmallTalkErrorCode.NOT_FOUND_PARTICULAR_AGORA);
    }

    public verifyParticularAgoraComment(particularSmallTalkCommentData: ParticularSmallTalkCommentData[]){
        if(!checkData(particularSmallTalkCommentData[0]))
            throw new SmallTalkException(SmallTalkErrorCode.NOT_FOUND_PARTICULAR_AGORA_COMMENT);
    }
}