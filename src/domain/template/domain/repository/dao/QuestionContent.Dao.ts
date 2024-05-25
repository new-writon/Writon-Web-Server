import { DataSource, Repository } from "typeorm";
import { InsertUserTemplateContent } from "../../../dto/InsertUserTemplateContent.js";
import { QuestionContent } from "../../entity/QuestionContent.js";
import { QuestionContentRepository } from "../QuestionContent.Repository.js";
import { Injectable } from "@nestjs/common";


@Injectable()
export class QuestionContentDao extends Repository<QuestionContent> implements QuestionContentRepository{

    constructor(private dataSource: DataSource) { super(QuestionContent, dataSource.createEntityManager()); }


    
    async insertQuestionContent(templateContents: InsertUserTemplateContent[]):Promise<QuestionContent[]>{
            const newQuestionContents = templateContents.map(this.createQuestionContentObject);
            return this.save(newQuestionContents);
    }

    private createQuestionContentObject(templateContent: InsertUserTemplateContent){
        return QuestionContent.createQuestionContent(templateContent.getQuestionId(), templateContent.getContent(), templateContent.getVisibility(), templateContent.getUserTempleteId());
    }
}