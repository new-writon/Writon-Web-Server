import { Repository } from "typeorm";
import { Agora } from "../entity/Agora.js";
import { ParticularAgoraData } from "../../dto/ParticularAgoraData.js";


export interface AgoraRepository extends Repository<Agora>{

    findAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>;

}