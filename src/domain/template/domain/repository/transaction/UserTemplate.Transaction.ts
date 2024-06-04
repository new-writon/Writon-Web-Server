import { DataSource, Repository } from "typeorm";
import { UserTemplete } from "../../entity/UserTemplete.js";
import { WriteTemplateContent } from "../../../../template/dto/TemplateContent.js";
import {Injectable } from "@nestjs/common";
import { InsertUserTemplateContent } from "../../../dto/InsertUserTemplateContent.js";
import { QuestionContent } from "../../entity/QuestionContent.js";

@Injectable()
export class UserTemplateTransaction {


    constructor(
        private dataSource: DataSource
    ){}


    public async insertTemplateTransaction(userChallnegeId: number, date: Date, complete: boolean, templateContent: Array<WriteTemplateContent>):Promise<void>{
      
        const newUserTemplate = UserTemplete.createUserTemplate(userChallnegeId, date, complete);
        await this.dataSource.transaction(async (transactionalEntityManager) => {
           const userTemplateData = await transactionalEntityManager.save(newUserTemplate)
           const changedTemplate = this.changeUserTemplateType(templateContent, userTemplateData.getId());
           const questionContents = changedTemplate.map(this.createQuestionContentObject);
           await transactionalEntityManager.save(questionContents)
       });   
      }

    public async updateTemplateTransaction(userTemplateId:number,templateContent:Array<WriteTemplateContent>){
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.delete(QuestionContent, {user_templete_id: userTemplateId });
            const changedTemplate = this.changeUserTemplateType(templateContent, userTemplateId);
            const questionContents = changedTemplate.map(this.createQuestionContentObject);
            await transactionalEntityManager.save(questionContents)
        });   
    }

    private createQuestionContentObject(templateContent: InsertUserTemplateContent){
        return QuestionContent.createQuestionContent(templateContent.getQuestionId(), templateContent.getContent(), templateContent.getVisibility(), templateContent.getUserTempleteId());
    }



    private changeUserTemplateType(writeTempletes: WriteTemplateContent[], userTempleteId: number):InsertUserTemplateContent[]{
        return writeTempletes.map(writeTemplete => new InsertUserTemplateContent(
            writeTemplete.getQuestionId(),
            writeTemplete.getContent(),
            writeTemplete.getVisibility(),
            userTempleteId, 
        ));
    }

}