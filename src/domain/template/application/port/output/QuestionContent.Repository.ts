import { QuestionContent } from 'src/domain/template/domain/entity/QuestionContent';
import { InsertUserTemplateContent } from 'src/domain/template/dto/values/InsertUserTemplateContent';
import { Repository } from 'typeorm';

export interface QuestionContentRepository extends Repository<QuestionContent> {
  insertQuestionContent(templateContent: InsertUserTemplateContent[]): Promise<QuestionContent[]>;
  deleteQuestionContent(userTemplateId: number): Promise<void>;
}
