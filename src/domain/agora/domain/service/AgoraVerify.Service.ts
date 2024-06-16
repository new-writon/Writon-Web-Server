import { Injectable } from "@nestjs/common";
import { checkData } from "../../util/checker.js";
import { ParticularAgoraData } from "../../dto/ParticularAgoraData.js";
import { AgoraException } from "../../exception/AgoraException.js";
import { AgoraErrorCode } from "../../exception/AgoraErrorCode.js";
import { ParticularAgoraCommentData } from "../../dto/ParticularAgoraCommentData.js";

@Injectable()
export class AgoraVerifyService{


    public verifyParticularAgora(particularAgoraData: ParticularAgoraData[]){
        if(!checkData(particularAgoraData[0]))
            throw new AgoraException(AgoraErrorCode.NOT_FOUND_PARTICULAR_AGORA);
    }

    public verifyParticularAgoraComment(particularAgoraCommentData: ParticularAgoraCommentData[]){
        if(!checkData(particularAgoraCommentData[0]))
            throw new AgoraException(AgoraErrorCode.NOT_FOUND_PARTICULAR_AGORA_COMMENT);
    }
}