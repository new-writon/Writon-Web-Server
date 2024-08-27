import { Injectable } from "@nestjs/common";
import { BasicQuestion } from "../dto/response/BasicQuestion";
import { SpecialQuestion } from "../dto/response/SpecialQuestion";
import { QuestionHelper } from "../helper/Question.Helper";





@Injectable()
export class ChallengeQuestionService{

    constructor(
        private readonly questionHelper:QuestionHelper
    ){}


    public async bringBasicQuestion(challengeId: number):Promise<BasicQuestion[]>{ 
        const basicQuestionData = await this.questionHelper.giveBasicQuestionByChallengeId(challengeId, false);
        return BasicQuestion.of(basicQuestionData);
    }


    public async bringSpecialQuestion(challengeId: number):Promise<SpecialQuestion[]>{
        const specialQuestionData = await this.questionHelper.giveSpecialQuestionByChallengeId(challengeId, false);
        return SpecialQuestion.of(specialQuestionData)
    }
}