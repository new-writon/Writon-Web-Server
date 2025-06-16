import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InsertUserTemplateContent } from 'src/domain/template/dto/values/InsertUserTemplateContent';
import { DefaultQuestionContentRepository } from 'src/domain/template/application/port/output/DefaultQuestionContent.Repository';
import { DefaultQuestionContent } from 'src/domain/template/domain/entity/DefaultQuestionContent';

@Injectable()
export class DefaultQuestionContentDao
  extends Repository<DefaultQuestionContent>
  implements DefaultQuestionContentRepository
{
  constructor(private dataSource: DataSource) {
    super(DefaultQuestionContent, dataSource.createEntityManager());
  }

  async insertDefaultQuestionContent(
    templateContents: InsertUserTemplateContent[],
  ): Promise<DefaultQuestionContent[]> {
    const newQuestionContents = templateContents.map(this.createQuestionContentObject);
    return this.save(newQuestionContents);
  }

  async deleteDefaultQuestionContent(userTemplateId: number): Promise<void> {
    this.delete({ userTemplateId: userTemplateId });
  }
  private createQuestionContentObject(templateContent: InsertUserTemplateContent) {
    return DefaultQuestionContent.createDefaultQuestionContent(
      templateContent.getQuestionId(),
      templateContent.getContent(),
      templateContent.getVisibility(),
      templateContent.getUserTempleteId(),
    );
  }
}
