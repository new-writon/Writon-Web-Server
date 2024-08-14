import { Inject, Injectable } from "@nestjs/common";
import { SmallTalkRepository } from "../domain/repository/SmallTalk.Repository.js";
import { SmallTalk } from "../domain/entity/SmallTalk.js";
import { ParticularAgoraData } from "../dto/ParticularAgoraData.js";
import { AgoraVerifyService } from "../domain/service/AgoraVerify.Service.js";



@Injectable()
export class AgoraHelper{

    constructor(
        @Inject("agoraImpl")
        private readonly agoraRepository: SmallTalkRepository,
        private readonly agoraVerifyService: AgoraVerifyService
    ){}


    public async giveParticularAgoraByChallengeIdAndDate(challengeId:number, date:Date, verifyChecking:boolean):Promise<ParticularAgoraData[]>{
        const particularAgoraData = await this.agoraRepository.findParticularAgoraByChallengeIdAndDate(challengeId, date);
        // if(verifyChecking)
        //     this.agoraVerifyService.verifyParticularAgora(particularAgoraData);
        return particularAgoraData;
    }

    public async executeInsertAgora(challengeId: number, userChallengeId: number, question:string):Promise<void>{
        return this.agoraRepository.insertAgora(challengeId, userChallengeId, question);
    }
    

    public async giveAgoraByChallengeIdAndDate(challengeId:number, date:string):Promise<SmallTalk[]>{
        return this.agoraRepository.findAgoraByChallengeIdAndDate(challengeId, date);
    }


}