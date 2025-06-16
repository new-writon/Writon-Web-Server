import { Inject, Injectable } from '@nestjs/common';
import { InsertUserTemplateContent } from 'src/domain/template/dto/values/InsertUserTemplateContent';
import { DefaultQuestionContentRepository } from '../port/output/DefaultQuestionContent.Repository';
import { DefaultQuestionContent } from '../../domain/entity/DefaultQuestionContent';

@Injectable()
export class DefaultQuestionContentHelper {
  constructor(
    @Inject('defaultquestionContentImpl')
    private readonly defaultQuestionContentRepository: DefaultQuestionContentRepository,
  ) {}

  public async executeInsertDefaultQuestionContent(
    templateContent: InsertUserTemplateContent[],
  ): Promise<DefaultQuestionContent[]> {
    return this.defaultQuestionContentRepository.insertDefaultQuestionContent(templateContent);
  }

  public async executeDeleteDefaultQuestionContent(userTemplateId: number): Promise<void> {
    return this.defaultQuestionContentRepository.deleteDefaultQuestionContent(userTemplateId);
  }
}
