import { Injectable } from "@nestjs/common";
import { ParticularSmallTalkData } from "../../../domain/smalltalk/dto/values/ParticularSmallTalkData";
import { SmallTalkException } from "./SmallTalkException";
import { SmallTalkErrorCode } from "./SmallTalkErrorCode";
import { checkData } from "../../../domain/auth/util/checker";
import { ParticularSmallTalkCommentData } from "../../../domain/smalltalk/dto/values/ParticularSmallTalkCommentData";
import { SmallTalk } from "../../../domain/smalltalk/domain/entity/SmallTalk";


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