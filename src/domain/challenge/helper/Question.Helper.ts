import { Inject } from "@nestjs/common";
import { QuestionRepository } from "../domain/repository/Question.Repository";
import { BasicQuestion } from "../dto/response/BasicQuestion";
import { SpecialQuestion } from "../dto/response/SpecialQuestion";
import { Question } from "../domain/entity/Question";
import { ChallengeVerifyService } from "../../../global/exception/challenge/ChallengeVerify.Service";


export class QuestionHelper{

    constructor(
        @Inject('questionImpl')
        private readonly questionRepository: QuestionRepository,
    ){}


    public async giveBasicQuestionByChallengeId(challengeId:number):Promise<BasicQuestion[]>{
        return this.questionRepository.findBasicQuestionByChallengeId(challengeId);
    }

    public async giveSpecialQuestionByChallengeId(challengeId:number):Promise<SpecialQuestion[]>{
        return this.questionRepository.findSpecialQuestionByChallengeId(challengeId);
    }

    public async giveQuestionById(questionId:number[]):Promise<Question[]>{
        return this.questionRepository.findQuestionById(questionId)
        
    }

    public async giveQuestionsByChallengeId(challengeId:number):Promise<Question[]>{
        return this.questionRepository.findQuestionsByChallengeId(challengeId);
    }


}