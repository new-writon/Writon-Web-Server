import { Inject, Injectable } from "@nestjs/common";
import { ChallengeDayRepository } from "../domain/repository/ChallengeDay.Repository";
import { ChallengeDay } from "../domain/entity/ChallengeDay";
import { ChallengeVerifyService } from "../domain/service/ChallengeVerify.Service";

@Injectable()
export class ChallengeDayHelper{


    constructor(
        @Inject('challengedayImpl')
        private readonly challengeDayRepository: ChallengeDayRepository,
        private readonly challengeVerifyService: ChallengeVerifyService
    ){}

    public async giveChallengeOverlapCount(challengeId: number): Promise<number>{
        return this.challengeDayRepository.findChallengeOverlapCount(challengeId);
    }

    public async giveChallengeDayByChallengeId(challengeId: number, verifyFlag:boolean): Promise<ChallengeDay[]>{
        const challengeDayDatas = await this.challengeDayRepository.findChallengeDayByChallengeId(challengeId);
        if(verifyFlag) this.challengeVerifyService.verifyChallengeDays(challengeDayDatas);
        return challengeDayDatas;
    }

    public async giveChallengeDayByChallengeIdAndDate(challengeId:number, date:Date, verifyFlag:boolean):Promise<ChallengeDay>{
        const challengeDayData = await this.challengeDayRepository.findChallengeDayByChallengeIdAndDate(challengeId, date);
        if(verifyFlag) this.challengeVerifyService.verifyChallengeDay(challengeDayData);
        return challengeDayData;
    }



    

}