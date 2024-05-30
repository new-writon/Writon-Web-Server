import { Injectable } from "@nestjs/common";
import { ChallengeHelper } from "../../../domain/challenge/helper/Challenge.Helper.js";
import { ChallengeDayHelper } from "../../../domain/challenge/helper/ChallengeDay.Helper.js";
import { ChallengeDay } from "../../../domain/challenge/domain/entity/ChallengeDay.js";


@Injectable()
export class ChallengeApi{
    constructor(
        private readonly challengeHelper: ChallengeHelper,
        private readonly challengeDayHelper: ChallengeDayHelper
    ){}


    public async requestChallengeById(challengeId: number){
        return this.challengeHelper.giveChallengeById(challengeId);
    }

    public async requestChallengeWithCondition(challengeId: number){
        return this.challengeHelper.giveChallengeWithCondition(challengeId);
    }

    public async requestOverlapPeriod(challengeId: number): Promise<number>{
        return this.challengeHelper.giveOverlapPeriod(challengeId);
    }


    public async requestOverlapCount(challengeId: number): Promise<number>{
        return this.challengeDayHelper.giveOverlapCount(challengeId);
    }

    public async requestChallengeDayByChallengeId(challengeId: number): Promise<ChallengeDay[]>{
        return this.challengeDayHelper.giveChallengeDayByChallengeId(challengeId);
    }



}