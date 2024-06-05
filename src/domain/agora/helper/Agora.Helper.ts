import { Inject, Injectable } from "@nestjs/common";
import { AgoraRepository } from "../domain/repository/Agora.Repository.js";
import { Agora } from "../domain/entity/Agora.js";
import { ParticularAgoraData } from "../dto/ParticularAgoraData.js";


@Injectable()
export class AgoraHelper{

    constructor(
        @Inject("agoraImpl")
        private readonly agoraRepository: AgoraRepository
    ){}


    public async giveAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>{
        return this.agoraRepository.findAgoraByChallengeIdAndDate(challengeId, date);
    }
    
}