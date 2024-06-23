import { Repository } from "typeorm";
import { Question } from "../entity/Question.js";
import { BasicQuestion } from "../../dto/response/BasicQuestion.js";
import { SpecialQuestion } from "../../dto/response/SpecialQuestion.js";


export interface QuestionRepository extends Repository<Question>{

    findBasicQuestionByChallengeId(challengeId:number):Promise<BasicQuestion[]>;
    findSpecialQuestionByChallengeId(challengeId:number):Promise<SpecialQuestion[]>;
    findQuestionById(questionId:number[]):Promise<Question[]>;

}