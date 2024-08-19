import { Inject, Injectable } from "@nestjs/common";
import { SatisfactionObjectiveResultRepository } from "../domain/repository/SatisfactionObjectiveResult.Repository";
import { ObjectiveAnswerType } from "../dto/values/ObjectiveAnswerType";


@Injectable()
export class SatisfactionObjectiveResultHelper{

    constructor(
        @Inject('satisfactionObjectiveResultImpl')
        private readonly satisfactionObjectiveResultRepository:SatisfactionObjectiveResultRepository

    ){}

    async executeInsertSatisfactionObjectiveResult(objectiveAnswer: ObjectiveAnswerType[]):Promise<void>{
        await this.satisfactionObjectiveResultRepository.insertSatisfactionObjectiveResult(objectiveAnswer);
    }

}