import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository";
import { Period } from "../dto/response/Period";
import { Challenge } from "../domain/entity/Challenge";

@Injectable()
export class ChallengeHelper{


    constructor(
        @Inject('implchallenge')
        private readonly challengeRepository: ChallengeRepository,
    ){}

    public async giveOverlapPeriod(challengeId: number): Promise<number>{

        return this.challengeRepository.findOverlapPeriod(challengeId);
    }

    public async giveChallengeById(challengeId: number): Promise<Challenge>{

        return this.challengeRepository.findChallengeById(challengeId);
    }

}