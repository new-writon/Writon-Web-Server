import { Injectable } from "@nestjs/common";
import { checkData } from "../../util/checker";
import { ParticularSmallTalkData } from "../../dto/values/ParticularSmallTalkData";
import { SmallTalkException } from "../../exception/SmallTalkException";
import { SmallTalkErrorCode } from "../../exception/SmallTalkErrorCode";
import { ParticularSmallTalkCommentData } from "../../dto/values/ParticularSmallTalkCommentData";
import { SmallTalk } from "../entity/SmallTalk";

@Injectable()
export class SmallTalkVerifyService{


    public verifyParticularSmallTalk(particularSmallTalkData: ParticularSmallTalkData[]){
        if(!checkData(particularSmallTalkData[0]))
            throw new SmallTalkException(SmallTalkErrorCode.NOT_FOUND_PARTICULAR_SMALL_TALK);
    }

    public verifyParticularSmallTalkComment(particularSmallTalkCommentData: ParticularSmallTalkCommentData[]){
        if(!checkData(particularSmallTalkCommentData[0]))
            throw new SmallTalkException(SmallTalkErrorCode.NOT_FOUND_PARTICULAR_SMALL_TALK_COMMENT);
    }

    public verifySmallTalk(smallTalkData: SmallTalk[]){
        if(!checkData(smallTalkData[0]))
            throw new SmallTalkException(SmallTalkErrorCode.NOT_FOUND_SMALL_TALK);
    }
}