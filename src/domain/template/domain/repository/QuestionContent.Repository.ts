import { Repository } from 'typeorm';
import { QuestionContent } from '../entity/QuestionContent';
import { InsertUserTemplateContent } from '../../dto/InsertUserTemplateContent';




export interface QuestionContentRepository extends Repository<QuestionContent> {



   insertQuestionContent(templateContent: InsertUserTemplateContent[]):Promise<QuestionContent[]>;



}