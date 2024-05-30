import { Inject } from "@nestjs/common";
import { QuestionRepository } from "../domain/repository/Question.Repository.js";
import { BasicQuestion } from "../dto/response/BasicQuestion.js";
import { SpecialQuestion } from "../dto/response/SpecialQuestion.js";


export class QuestionHelper{

    constructor(
        @Inject('questionImpl')
        private readonly questionRepository: QuestionRepository
    ){}


    public async giveBasicQuestionByChallengeId(challengeId:number):Promise<BasicQuestion[]>{
        return this.questionRepository.findBasicQuestionByChallengeId(challengeId);
    }

    public async giveSpecialQuestionByChallengeId(challengeId:number):Promise<SpecialQuestion[]>{
        return this.questionRepository.findSpecialQuestionByChallengeId(challengeId)
    }


}