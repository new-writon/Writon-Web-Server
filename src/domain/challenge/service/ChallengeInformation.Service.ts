import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository.js";
import { ChallengeDayRepository } from "../domain/repository/ChallengeDay.Repository.js";
import { ChallengeDay } from "../domain/entity/ChallengeDay.js";
import { ChallengeException } from "../exception/ChallengeException.js";
import { ChallengeErrorCode } from "../exception/ChallengeErrorCode.js";




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

    private verifyChallengeDay(challengeDay : ChallengeDay){
        if(!this.checkData(challengeDay))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE_DAY);
        
    }



     /**
     * 
     * @param data 
     * @returns  데이터가 없을 경우 false 반환, 있을 경우 true 반환
     */
     private checkData(data: any): boolean {
        let result = true
        if (!data) {   // 데이터가 없을 경우
            return result = false;
        }
        return result;
    }

}