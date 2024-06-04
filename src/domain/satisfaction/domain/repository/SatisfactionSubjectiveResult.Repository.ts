import { Repository } from "typeorm";
import { SatisfactionSubjectiveResult } from "../entity/SatisfactionSubjectiveResult.js";
import { SubjectiveAnswerType } from "../../dto/SubjectiveAnswerType.js";



export interface SatisfactionSubjectiveResultRepository extends Repository<SatisfactionSubjectiveResult>{
    
    insertSatisfactionSubjectiveResult(subjectiveAnswer: SubjectiveAnswerType[]):Promise<void>;
}