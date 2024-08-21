import { Injectable } from "@nestjs/common";
import { ChallengeDayHelper } from "../../challenge/helper/ChallengeDay.Helper";
import { ChallengeDay } from "../../challenge/domain/entity/ChallengeDay";
import { Question } from "../../challenge/domain/entity/Question";
import { QuestionHelper } from "../../challenge/helper/Question.Helper";


@Injectable()
export class ChallengeApi{


    constructor(
        private readonly challengeDayHelper: ChallengeDayHelper,
        private readonly questionHelper: QuestionHelper
    ){}

    public async requestChallengeDayByChallengeIdAndDate(challengeId:number, date:Date):Promise<ChallengeDay>{
         // 검증 x
        return this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(challengeId,date);
    }

    public async requestQuestionById(questionId:number[]):Promise<Question[]>{
         // 검증 x
        return this.questionHelper.giveQuestionById(questionId)
        
    }

   

}