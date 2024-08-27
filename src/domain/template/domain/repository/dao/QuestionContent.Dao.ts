import { DataSource, Repository } from "typeorm";
import { InsertUserTemplateContent } from "../../../dto/values/InsertUserTemplateContent";
import { QuestionContent } from "../../entity/QuestionContent";
import { QuestionContentRepository } from "../QuestionContent.Repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class QuestionContentDao extends Repository<QuestionContent> implements QuestionContentRepository{

    constructor(private dataSource: DataSource) { super(QuestionContent, dataSource.createEntityManager()); }


    
    async insertQuestionContent(templateContents: InsertUserTemplateContent[]):Promise<QuestionContent[]>{
            const newQuestionContents = templateContents.map(this.createQuestionContentObject);
            return this.save(newQuestionContents);
    }

    async deleteQuestionContent(userTemplateId:number):Promise<void>{
        this.delete({userTemplateId:userTemplateId})
    }

    private createQuestionContentObject(templateContent: InsertUserTemplateContent){
        return QuestionContent.createQuestionContent(templateContent.getQuestionId(), templateContent.getContent(), templateContent.getVisibility(), templateContent.getUserTempleteId());
    }
}