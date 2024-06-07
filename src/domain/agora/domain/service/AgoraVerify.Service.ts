import { Injectable } from "@nestjs/common";
import { checkData } from "../../util/checker.js";
import { ParticularAgoraData } from "../../dto/ParticularAgoraData.js";
import { AgoraException } from "../../exception/AgoraException.js";
import { AgoraErrorCode } from "../../exception/AgoraErrorCode.js";

@Injectable()
export class AgoraVerifyService{


    public verifyParticularAgora(particularAgoraData: ParticularAgoraData[]){
        if(!checkData(particularAgoraData[0]))
            throw new AgoraException(AgoraErrorCode.NOT_FOUND_PARTICULAR_AGORA);
    }
}