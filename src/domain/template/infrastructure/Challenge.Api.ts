import { Injectable } from "@nestjs/common";
import { ChallengeDayHelper } from "../../challenge/helper/ChallengeDay.Helper.js";
import { ChallengeDay } from "../../challenge/domain/entity/ChallengeDay.js";


@Injectable()
export class ChallengeApi{


    constructor(
        private readonly challengeDayHelper: ChallengeDayHelper
    ){}

    public async requestChallengeDayByChallengeIdAndDate(challengeId:number, date:Date):Promise<ChallengeDay>{
        return this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(challengeId,date);
    }

   

}