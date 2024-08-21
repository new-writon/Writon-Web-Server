import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SatisfactionSubjectiveResultRepository } from "../SatisfactionSubjectiveResult.Repository";
import { SatisfactionSubjectiveResult } from "../../entity/SatisfactionSubjectiveResult";
import { SubjectiveAnswerType } from "../../../dto/values/SubjectiveAnswerType";


@Injectable()
export class SatisfactionSubjectiveResultDao extends Repository<SatisfactionSubjectiveResult> implements SatisfactionSubjectiveResultRepository{
    constructor(private dataSource: DataSource) { super(SatisfactionSubjectiveResult, dataSource.createEntityManager()); }

    async insertSatisfactionSubjectiveResult(subjectiveAnswer: SubjectiveAnswerType[]):Promise<void>{
        const subjectiveAnswerObject = subjectiveAnswer.map((subjectiveAnswer)=>{
            return SatisfactionSubjectiveResult.createSatisfactionSubjectiveResult(subjectiveAnswer.getAnswer(), subjectiveAnswer.getSatisfactionId(), subjectiveAnswer.getUserChallengeId());
        })
        this.save(subjectiveAnswerObject);           
    }
}