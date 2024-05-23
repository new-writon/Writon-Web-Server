import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Question } from "../../entity/Question.js";
import { QuestionRepository } from "../Question.Repository.js";
import { QuestionTag } from "../../entity/QuestionTag.js";
import { SpecialQuestion } from "../../../dto/response/SpecialQuestion.js";
import { BasicQuestion } from "../../../dto/response/BasicQuestion.js";



@Injectable()
export class QuestionDao extends Repository<Question> implements QuestionRepository{

    constructor(private dataSource: DataSource) { super(Question, dataSource.createEntityManager());}


    findBasicQuestionByChallengeId(challengeId:number):Promise<BasicQuestion[]>{
        return this.dataSource.createQueryBuilder()
        .select([ 
            'q.question_id AS question_id', 
            'q.question AS question'
        ])
        .from(Question, 'q')
        .where('q.challenge_id = :challengeId',{challengeId})
        .andWhere('q.category LIKE :category', { category: '%베이직%' })
        .orderBy('q.question_id')
        .getRawMany()

    }

    findSpecialQuestionByChallengeId(challengeId:number):Promise<SpecialQuestion[]>{
        return this.dataSource.createQueryBuilder()
        .select([
            'q.question_id AS question_id', 
            'q.question AS question', 
            'qt.category AS category'
        ])
        .from(Question, 'q')
        .innerJoin(QuestionTag, 'qt','qt.question_id = q.question_id')
        .where('q.challenge_id = :challengeId',{challengeId})
        .andWhere('q.category LIKE :category', { category: '%스페셜%' })
        .orderBy('qt.category')
        .addOrderBy('q.question_id')
        .getRawMany()
        
    }


}