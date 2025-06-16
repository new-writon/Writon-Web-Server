import { DefaultQuestionContent } from 'src/domain/template/domain/entity/DefaultQuestionContent';
import { InsertUserTemplateContent } from 'src/domain/template/dto/values/InsertUserTemplateContent';
import { Repository } from 'typeorm';

export interface DefaultQuestionContentRepository extends Repository<DefaultQuestionContent> {
  insertDefaultQuestionContent(
    templateContent: InsertUserTemplateContent[],
  ): Promise<DefaultQuestionContent[]>;
  deleteDefaultQuestionContent(userTemplateId: number): Promise<void>;
}
