import { Inject, Injectable } from "@nestjs/common";
import { SmallTalkRepository } from "../domain/repository/SmallTalk.Repository";
import { SmallTalk } from "../domain/entity/SmallTalk";
import { ParticularSmallTalkData } from "../dto/values/ParticularSmallTalkData";
import { SmallTalkVerifyService } from "../../../global/exception/smalltalk/SmallTalkVerify.Service";




@Injectable()
export class SmallTalkHelper{

    constructor(
        @Inject("smallTalkImpl")
        private readonly smallTalkRepository: SmallTalkRepository,
        private readonly smallTalkVerifyService:SmallTalkVerifyService
    ){}


    public async giveParticularSmallTalkByChallengeIdAndDate(challengeId:number, date:string):Promise<ParticularSmallTalkData[]>{
        return this.smallTalkRepository.findParticularSmallTalkByChallengeIdAndDate(challengeId, date); 
    }

    public async executeInsertSmallTalk(challengeId: number, userChallengeId: number, question:string):Promise<void>{
        return this.smallTalkRepository.insertSmallTalk(challengeId, userChallengeId, question);
    }
    

    public async giveSmallTalkByChallengeIdAndDate(challengeId:number, date:string):Promise<SmallTalk[]>{
        return this.smallTalkRepository.findSmallTalkByChallengeIdAndDate(challengeId, date);
    }


}