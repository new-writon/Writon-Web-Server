import { Injectable } from "@nestjs/common";
import { ChallengeHelper } from "../../../domain/challenge/helper/Challenge.Helper.js";


@Injectable()
export class ChallengeApi{
    constructor(
        private readonly challengeHelper: ChallengeHelper
    ){}


    async requestChallengeById(challengeId: number){
        return this.challengeHelper.giveChallengeById(challengeId);
    }

    async requestChallengeWithCondition(challengeId: number){
        return this.challengeHelper.giveChallengeWithCondition(challengeId);
    }
}