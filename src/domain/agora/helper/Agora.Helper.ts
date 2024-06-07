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
        private readonly agoraVerifyService:AgoraVerifyService
    ){}


    public async giveAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>{
        const particularAgoraData = await this.agoraRepository.findAgoraByChallengeIdAndDate(challengeId, date);
        this.agoraVerifyService.verifyParticularAgora(particularAgoraData);
        return particularAgoraData;
    }
    
}