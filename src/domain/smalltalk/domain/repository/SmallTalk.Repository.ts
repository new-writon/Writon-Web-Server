import { Repository } from "typeorm";
import { SmallTalk } from "../entity/SmallTalk.js";
import { ParticularAgoraData } from "../../dto/ParticularAgoraData.js";


export interface SmallTalkRepository extends Repository<SmallTalk>{

    findParticularAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>;
    insertAgora(challengeId: number, userChallengeId: number, question:string):Promise<void>;
    findAgoraByChallengeIdAndDate(challengeId:number, date:string):Promise<SmallTalk[]>;
}