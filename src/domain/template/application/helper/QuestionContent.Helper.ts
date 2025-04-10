import { Inject, Injectable } from '@nestjs/common';
import { QuestionContentRepository } from 'src/domain/template/application/port/output/QuestionContent.Repository';
import { QuestionContent } from 'src/domain/template/domain/entity/QuestionContent';
import { InsertUserTemplateContent } from 'src/domain/template/dto/values/InsertUserTemplateContent';

@Injectable()
export class QuestionContentHelper {
  constructor(
    @Inject('questionContentImpl')
    private readonly questionContentRepository: QuestionContentRepository,
  ) {}

  public async executeInsertQuestionContent(
    templateContent: InsertUserTemplateContent[],
  ): Promise<QuestionContent[]> {
    return this.questionContentRepository.insertQuestionContent(templateContent);
  }

  public async executeDeleteQuestionContent(userTemplateId: number): Promise<void> {
    return this.questionContentRepository.deleteQuestionContent(userTemplateId);
  }
}
