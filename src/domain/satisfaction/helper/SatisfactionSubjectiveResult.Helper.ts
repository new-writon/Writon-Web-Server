import { Inject, Injectable } from "@nestjs/common";
import { SatisfactionSubjectiveResultRepository } from "../domain/repository/SatisfactionSubjectiveResult.Repository.js";
import { SubjectiveAnswerType } from "../dto/SubjectiveAnswerType.js";

@Injectable()
export class SatisfactionSubjectiveResultHelper{

    constructor(
        @Inject('satisfactionSubjectiveResultImpl')
        private readonly satisfactionSubjectiveResultRepository:SatisfactionSubjectiveResultRepository

    ){}

    async executeInsertSatisfactionSubjectiveResult(subjectiveAnswer: SubjectiveAnswerType[]):Promise<void>{
        await this.satisfactionSubjectiveResultRepository.insertSatisfactionSubjectiveResult(subjectiveAnswer);
    }

}