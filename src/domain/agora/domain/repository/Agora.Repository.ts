import { Repository } from "typeorm";
import { Agora } from "../entity/Agora.js";
import { ParticularAgoraData } from "../../dto/ParticularAgoraData.js";


export interface AgoraRepository extends Repository<Agora>{

    findParticularAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>;
    insertAgora(challengeId: number, userChallengeId: number, question:string):Promise<void>;
    findAgoraByChallengeIdAndDate(challengeId:number, date:string):Promise<Agora[]>;
}