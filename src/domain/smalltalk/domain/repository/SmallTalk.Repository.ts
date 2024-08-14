import { Repository } from "typeorm";
import { SmallTalk } from "../entity/SmallTalk.js";
import { ParticularSmallTalkData } from "../../dto/ParticularSmallTalkData.js";


export interface SmallTalkRepository extends Repository<SmallTalk>{

    findParticularSmallTalkByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularSmallTalkData[]>;
    insertSmallTalk(challengeId: number, userChallengeId: number, question:string):Promise<void>;
    findSmallTalkByChallengeIdAndDate(challengeId:number, date:string):Promise<SmallTalk[]>;
}