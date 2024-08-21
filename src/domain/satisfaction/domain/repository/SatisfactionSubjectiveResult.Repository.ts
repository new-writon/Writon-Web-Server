import { Repository } from "typeorm";
import { SatisfactionSubjectiveResult } from "../entity/SatisfactionSubjectiveResult";
import { SubjectiveAnswerType } from "../../dto/values/SubjectiveAnswerType";



export interface SatisfactionSubjectiveResultRepository extends Repository<SatisfactionSubjectiveResult>{
    
    insertSatisfactionSubjectiveResult(subjectiveAnswer: SubjectiveAnswerType[]):Promise<void>;
}