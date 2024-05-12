import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository";
import { Period } from "../dto/response/Period";
import { ChallengeDayRepository } from "../domain/repository/ChallengeDay.Repository";

@Injectable()
export class ChallengeDayHelper{


    constructor(
        @Inject('implchallengeday')
        private readonly challengeDayRepository: ChallengeDayRepository,
    ){}

    public async giveOverlapCount(challengeId: number): Promise<number>{

        return this.challengeDayRepository.findOverlapCount(challengeId);
    }

}