import { Inject } from "@nestjs/common";
import { QuestionRepository } from "../domain/repository/Question.Repository";
import { BasicQuestion } from "../dto/response/BasicQuestion";
import { SpecialQuestion } from "../dto/response/SpecialQuestion";
import { Question } from "../domain/entity/Question";
import { ChallengeVerifyService } from "../domain/service/ChallengeVerify.Service";


export class QuestionHelper{

    constructor(
        @Inject('questionImpl')
        private readonly questionRepository: QuestionRepository,
        private readonly challengeVerifyService: ChallengeVerifyService
    ){}


    public async giveBasicQuestionByChallengeId(challengeId:number, verifyFlag:boolean):Promise<BasicQuestion[]>{
        const datas = await this.questionRepository.findBasicQuestionByChallengeId(challengeId);
        if(verifyFlag) this.challengeVerifyService.verifyBasicQuestion(datas);
        return datas;
    }

    public async giveSpecialQuestionByChallengeId(challengeId:number, verifyFlag:boolean):Promise<SpecialQuestion[]>{
        const datas = await this.questionRepository.findSpecialQuestionByChallengeId(challengeId);
        if(verifyFlag) this.challengeVerifyService.verifySpecialQuestion(datas);
        return datas;
    }

    public async giveQuestionById(questionId:number[], verifyFlag:boolean):Promise<Question[]>{
        const datas = await this.questionRepository.findQuestionById(questionId)
        if(verifyFlag) this.challengeVerifyService.verifyQuestion(datas);
        return datas;
    }

    public async giveQuestionsByChallengeId(challengeId:number):Promise<Question[]>{
        return this.questionRepository.findQuestionsByChallengeId(challengeId);
    }


}