import { Repository } from "typeorm";
import { SmallTalk } from "../entity/SmallTalk";
import { ParticularSmallTalkData } from "../../dto/values/ParticularSmallTalkData";


export interface SmallTalkRepository extends Repository<SmallTalk>{

    findParticularSmallTalkByChallengeIdAndDate(challengeId:number, date:string):Promise<ParticularSmallTalkData[]>;
    insertSmallTalk(challengeId: number, userChallengeId: number, question:string):Promise<void>;
    findSmallTalkByChallengeIdAndDate(challengeId:number, date:string):Promise<SmallTalk[]>;
}