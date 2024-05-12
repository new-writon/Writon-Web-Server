import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository";
import { Period } from "../dto/response/Period";
import { ChallengeDayRepository } from "../domain/repository/ChallengeDay.Repository";
import { ChallengeDay } from "../domain/entity/ChallengeDay";

@Injectable()
export class ChallengeDayHelper{


    constructor(
        @Inject('implchallengeday')
        private readonly challengeDayRepository: ChallengeDayRepository,
    ){}

    public async giveOverlapCount(challengeId: number): Promise<number>{

        return this.challengeDayRepository.findOverlapCount(challengeId);
    }

    public async giveChallengeDayByChallengeId(challengeId: number): Promise<ChallengeDay[]>{
        return this.challengeDayRepository.findChallengeDayByChallengeId(challengeId);
    }



    

}