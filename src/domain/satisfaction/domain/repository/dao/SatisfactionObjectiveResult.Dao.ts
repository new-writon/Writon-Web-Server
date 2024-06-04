import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SatisfactionObjectiveResult } from "../../entity/SatisfactionObjectiveResult.js";
import { SatisfactionObjectiveResultRepository } from "../SatisfactionObjectiveResult.Repository.js";
import { ObjectiveAnswerType } from "../../../dto/ObjectiveAnswerType.js";

@Injectable()
export class SatisfactionObjectiveResultDao extends Repository<SatisfactionObjectiveResult> implements SatisfactionObjectiveResultRepository{

    constructor(private dataSource: DataSource) { super(SatisfactionObjectiveResult, dataSource.createEntityManager()); }


    async insertSatisfactionObjectiveResult(objectiveAnswer: ObjectiveAnswerType[]):Promise<void>{
        const objectiveAnswerObject = objectiveAnswer.map((objectiveAnswer)=>{
            return SatisfactionObjectiveResult.createSatisfactionObjectiveResult(objectiveAnswer.getSatisfactionId(),objectiveAnswer.getScore(), objectiveAnswer.getUserChallengeId());
        })
        this.save(objectiveAnswerObject);     
    }

}