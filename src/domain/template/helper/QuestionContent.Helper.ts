import { Inject, Injectable } from "@nestjs/common";
import { QuestionContentRepository } from "../domain/repository/QuestionContent.Repository.js";
import { InsertUserTemplateContent } from "../dto/InsertUserTemplateContent.js";
import { QuestionContent } from "../domain/entity/QuestionContent.js";


@Injectable()
export class QuestionContentHelper{

    constructor(
        @Inject('questionContentImpl')
        private readonly questionContentRepository: QuestionContentRepository
    ){}

    public async insertQuestionContent(templateContent: InsertUserTemplateContent[]):Promise<QuestionContent[]>{
        return this.questionContentRepository.insertQuestionContent(templateContent);
    }
}