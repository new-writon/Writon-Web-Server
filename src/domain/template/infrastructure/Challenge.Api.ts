import { Injectable } from "@nestjs/common";
import { ChallengeDayHelper } from "../../challenge/helper/ChallengeDay.Helper.js";
import { ChallengeDay } from "../../challenge/domain/entity/ChallengeDay.js";
import { Question } from "../../challenge/domain/entity/Question.js";
import { QuestionHelper } from "../../challenge/helper/Question.Helper.js";


@Injectable()
export class ChallengeApi{


    constructor(
        private readonly challengeDayHelper: ChallengeDayHelper,
        private readonly questionHelper: QuestionHelper
    ){}

    public async requestChallengeDayByChallengeIdAndDate(challengeId:number, date:Date):Promise<ChallengeDay>{
        return this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(challengeId,date);
    }

    public async requestQuestionById(questionId:number[]):Promise<Question[]>{
        return this.questionHelper.giveQuestionById(questionId)
        
    }

   

}