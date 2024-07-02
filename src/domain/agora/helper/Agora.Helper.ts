import { Inject, Injectable } from "@nestjs/common";
import { AgoraRepository } from "../domain/repository/Agora.Repository.js";
import { Agora } from "../domain/entity/Agora.js";
import { ParticularAgoraData } from "../dto/ParticularAgoraData.js";
import { AgoraVerifyService } from "../domain/service/AgoraVerify.Service.js";



@Injectable()
export class AgoraHelper{

    constructor(
        @Inject("agoraImpl")
        private readonly agoraRepository: AgoraRepository,
        private readonly agoraVerifyService: AgoraVerifyService
    ){}


    public async giveParticularAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>{
        const particularAgoraData = await this.agoraRepository.findParticularAgoraByChallengeIdAndDate(challengeId, date);
        return particularAgoraData;
    }

    public async giveParticularAgoraByChallengeIdAndDateException(challengeId:number, date:Date):Promise<ParticularAgoraData[]>{
        const particularAgoraData = await this.agoraRepository.findParticularAgoraByChallengeIdAndDate(challengeId, date);
        this.agoraVerifyService.verifyParticularAgora(particularAgoraData);
        return particularAgoraData;
    }



    public async executeInsertAgora(challengeId: number, userChallengeId: number, question:string):Promise<void>{
        return this.agoraRepository.insertAgora(challengeId, userChallengeId, question);
    }
    

    public async giveAgoraByChallengeIdAndDate(challengeId:number, date:string):Promise<Agora[]>{
        return this.agoraRepository.findAgoraByChallengeIdAndDate(challengeId, date);
    }


}