import { Inject, Injectable } from "@nestjs/common";

import { BasicQuestion } from "../dto/response/BasicQuestion.js";
import { SpecialQuestion } from "../dto/response/SpecialQuestion.js";
import { QuestionHelper } from "../helper/Question.Helper.js";





@Injectable()
export class ChallengeQuestionService{

    constructor(
        // @Inject('questionImpl')
        // private readonly questionRepository: QuestionRepository
        private readonly questionHelper:QuestionHelper
    ){}


    public async bringBasicQuestion(challengeId: number):Promise<BasicQuestion[]>{ 
        const basicQuestionData = await this.questionHelper.giveBasicQuestionByChallengeId(challengeId);
        console.log(basicQuestionData)
        return BasicQuestion.of(basicQuestionData);
    }


    public async bringSpecialQuestion(challengeId: number):Promise<SpecialQuestion[]>{
        const specialQuestionData = await this.questionHelper.giveSpecialQuestionByChallengeId(challengeId);
        return SpecialQuestion.of(specialQuestionData)

    }
}