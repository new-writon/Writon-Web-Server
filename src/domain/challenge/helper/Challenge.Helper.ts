import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository";
import { Period } from "../dto/response/Period";
import { Challenge } from "../domain/entity/Challenge";
import { ChallengeInformation } from "../dto/ChallengeInformation";

@Injectable()
export class ChallengeHelper{


    constructor(
        @Inject('challengeImpl')
        private readonly challengeRepository: ChallengeRepository,
    ){}

    public async giveOverlapPeriod(challengeId: number): Promise<number>{

        return this.challengeRepository.findOverlapPeriod(challengeId);
    }

    public async giveChallengeById(challengeId: number): Promise<Challenge>{

        return this.challengeRepository.findChallengeById(challengeId);
    }

    public async giveChallengeWithCondition(challengeId: number): Promise<ChallengeInformation[]>{

        return this.challengeRepository.findChallengeWithCondition(challengeId);

    }

}