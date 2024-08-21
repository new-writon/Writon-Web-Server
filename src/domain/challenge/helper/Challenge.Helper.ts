import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository";
import { Challenge } from "../domain/entity/Challenge";
import { ChallengeInformation } from "../dto/values/ChallengeInformation";
import { ChallengeAndOrganization } from "../dto/values/ChallengeAndOrganization";
import { ChallengeVerifyService } from "../domain/service/ChallengeVerify.Service";

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

    public async giveChallengeById(challengeId: number, verifyFlag:boolean): Promise<Challenge>{
        const challengeData = await this.challengeRepository.findChallengeById(challengeId);
        if(verifyFlag) this.challengeVerifyService.verifyChallenge(challengeData);
        return challengeData;
    }

    public async giveChallengeWithCondition(challengeId: number): Promise<ChallengeInformation[]>{
        return this.challengeRepository.findChallengeWithCondition(challengeId);
    }

    public async giveChallengeByIdAndOngoing(challengeId: number, verifyFlag:boolean): Promise<Challenge[]>{
        const challengeDatas = await this.challengeRepository.findChallengeByIdAndOngoing(challengeId);
        if(verifyFlag) this.challengeVerifyService.verifyChallenges(challengeDatas);
        return challengeDatas;
    }

    public async giveChallengeByChallengeName(challenge:string, verifyFlag:boolean):Promise<Challenge>{
        const challengeData = await this.challengeRepository.findChallengeByChallengeName(challenge);
        if(verifyFlag) this.challengeVerifyService.verifyChallenge(challengeData);
        return challengeData;
    }

    public async giveAllChallengeAccordingToOrganization():Promise<ChallengeAndOrganization[]>{
        return this.challengeRepository.findAllChallengeAccordingToOrganization();
    }

    public async giveAllChallengingInformation():Promise<ChallengeAllInformation[]>{
        return this.challengeRepository.findAllChallengingInformation();
    }



}