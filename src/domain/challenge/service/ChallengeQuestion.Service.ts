import { Inject, Injectable } from "@nestjs/common";
import { ChallengeRepository } from "../domain/repository/Challenge.Repository.js";
import { QuestionRepository } from "../domain/repository/Question.Repository.js";
import { BasicQuestion } from "../dto/response/BasicQuestion.js";
import { SpecialQuestion } from "../dto/response/SpecialQuestion.js";
import { Question } from "../domain/entity/Question.js";





@Injectable()
export class ChallengeQuestionService{

    constructor(
        @Inject('questionImpl')
        private readonly questionRepository: QuestionRepository
    ){}


    public async bringBasicQuestion(challengeId: number):Promise<BasicQuestion[]>{ 
        const basicQuestionData = await this.questionRepository.findBasicQuestionByChallengeId(challengeId);
        return BasicQuestion.of(basicQuestionData);
    }


    public async bringSpecialQuestion(challengeId: number):Promise<SpecialQuestion[]>{
        const specialQuestionData = await this.questionRepository.findSpecialQuestionByChallengeId(challengeId);
        return SpecialQuestion.of(specialQuestionData)

    }
}