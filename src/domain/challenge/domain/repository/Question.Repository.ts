import { Repository } from "typeorm";
import { Question } from "../entity/Question";
import { BasicQuestion } from "../../dto/response/BasicQuestion";
import { SpecialQuestion } from "../../dto/response/SpecialQuestion";


export interface QuestionRepository extends Repository<Question>{

    findBasicQuestionByChallengeId(challengeId:number):Promise<BasicQuestion[]>;
    findSpecialQuestionByChallengeId(challengeId:number):Promise<SpecialQuestion[]>;
    findQuestionById(questionId:number[]):Promise<Question[]>;

}