import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository.js";
import { Challenge } from "../domain/entity/Challenge.js";
import { ChallengeInformation } from "../dto/ChallengeInformation.js";
import { ChallengeAndOrganization } from "../dto/ChallengeAndOrganization.js";
import { ChallengeVerifyService } from "../domain/service/ChallengeVerify.Service.js";

@Injectable()
export class ChallengeHelper{


    constructor(
        @Inject('challengeImpl')
        private readonly challengeRepository: ChallengeRepository,
        private readonly challengeVerifyService: ChallengeVerifyService
    ){}

    public async giveOverlapPeriod(challengeId: number): Promise<number>{
        return this.challengeRepository.findOverlapPeriod(challengeId);
    }

    public async giveChallengeById(challengeId: number): Promise<Challenge>{
        const challengeData = await this.challengeRepository.findChallengeById(challengeId);
        this.challengeVerifyService.verifyChallenge(challengeData);
        return challengeData;
    }

    public async giveChallengeWithCondition(challengeId: number): Promise<ChallengeInformation[]>{
        return this.challengeRepository.findChallengeWithCondition(challengeId);
    }

    public async giveChallengeByIdAndOngoing(challengeId: number): Promise<Challenge[]>{
        return this.challengeRepository.findChallengeByIdAndOngoing(challengeId);
    }

    public async giveChallengeByChallengeName(challenge:string):Promise<Challenge>{
        return this.challengeRepository.findChallengeByChallengeName(challenge);
    }

    public async giveAllChallengeAccordingToOrganization():Promise<ChallengeAndOrganization[]>{
        return this.challengeRepository.findAllChallengeAccordingToOrganization();
    }



}