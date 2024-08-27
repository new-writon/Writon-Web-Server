import { Repository } from 'typeorm';
import { QuestionContent } from '../entity/QuestionContent';
import { InsertUserTemplateContent } from '../../dto/values/InsertUserTemplateContent';




export interface QuestionContentRepository extends Repository<QuestionContent> {

   insertQuestionContent(templateContent: InsertUserTemplateContent[]):Promise<QuestionContent[]>;
   deleteQuestionContent(userTemplateId:number):Promise<void>;
}