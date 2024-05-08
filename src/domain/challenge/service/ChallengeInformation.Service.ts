import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository.js";
import { ChallengeDayRepository } from "../domain/repository/ChallengeDay.Repository.js";
import { ChallengeDay } from "../domain/entity/ChallengeDay.js";
import { ChallengeException } from "../exception/ChallengeException.js";
import { ChallengeErrorCode } from "../exception/ChallengeErrorCode.js";
import { Challenge } from "../domain/entity/Challenge.js";
import { checkData } from "../util/checker.js";
import { ChallengeStatus } from "../dto/response/ChallengeStatus.js";




@Injectable()
export class ChallengeInformationService{

    constructor(
        @Inject('impl')
        private readonly challengeRepository: ChallengeRepository,
        @Inject('impl')
        private readonly challengeDayRepository: ChallengeDayRepository,
    ){}


    public async signChallengeDay( challengeId: number, date: Date){ 
        const challengeDayData = await this.challengeDayRepository.findChallengeDayByChallengeIdAndDate(challengeId, date);
        this.verifyChallengeDay(challengeDayData)
    }

    public async signChallengeFinish(challengeId: number): Promise<ChallengeStatus> { 
        const challengeData : Challenge = await this.challengeRepository.findChallengeById(challengeId);
        const challengeStatus : boolean = this.verifyChallengeStatus(challengeData);

        
        return ChallengeStatus.of(challengeStatus);
       
    }

    private verifyChallengeStatus(challengeData: Challenge): boolean{
        if(!checkData(challengeData))  // 데이터가 없을 떄
            return true;
        return false;
    }


    private verifyChallengeDay(challengeDay : ChallengeDay){
        if(!checkData(challengeDay))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE_DAY);
        
    }




}