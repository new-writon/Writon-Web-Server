import { Inject, Injectable } from "@nestjs/common";
import { SmallTalkRepository } from "../domain/repository/SmallTalk.Repository";
import { SmallTalk } from "../domain/entity/SmallTalk";
import { ParticularSmallTalkData } from "../dto/values/ParticularSmallTalkData";
import { SmallTalkVerifyService } from "../domain/service/SmallTalkVerify.Service";




@Injectable()
export class SmallTalkHelper{

    constructor(
        @Inject("smallTalkImpl")
        private readonly smallTalkRepository: SmallTalkRepository,
        private readonly smallTalkVerifyService:SmallTalkVerifyService
    ){}


    public async giveParticularSmallTalkByChallengeIdAndDate(challengeId:number, date:Date, verifyFlag:boolean):Promise<ParticularSmallTalkData[]>{
        const datas = await this.smallTalkRepository.findParticularSmallTalkByChallengeIdAndDate(challengeId, date);
        if(verifyFlag) this.smallTalkVerifyService.verifyParticularSmallTalk(datas);
        return datas;
    }

    public async executeInsertSmallTalk(challengeId: number, userChallengeId: number, question:string):Promise<void>{
        return this.smallTalkRepository.insertSmallTalk(challengeId, userChallengeId, question);
    }
    

    public async giveSmallTalkByChallengeIdAndDate(challengeId:number, date:string, verifyFlag:boolean):Promise<SmallTalk[]>{
        const datas = await this.smallTalkRepository.findSmallTalkByChallengeIdAndDate(challengeId, date);
        if(verifyFlag) this.smallTalkVerifyService.verifySmallTalk(datas);
        return datas;
    }


}