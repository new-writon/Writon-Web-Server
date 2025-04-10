import { Injectable } from '@nestjs/common';
import { TemplateUpdate } from '../../../dto/request/TemplateUpdate';
import { TemplateOperation } from '../types/Operation';
import { Transactional } from 'src/global/decorator/transaction';
import { TemplateWriter } from '../TemplateWriter';
import { DataSource } from 'typeorm';
import { QuestionContentHelper } from 'src/domain/template/application/helper/QuestionContent.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';

@Injectable()
export class TemplateEditor
  extends TemplateWriter
  implements TemplateUseCase<[TemplateUpdate], Promise<void>>
{
  operation: TemplateOperation = 'UPDATE_TEMPLATE';

  constructor(
    private readonly questionContentHelper: QuestionContentHelper,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  @Transactional()
  async handle(request: [TemplateUpdate]): Promise<void> {
    const [templateUpdate] = request;
    await this.questionContentHelper.executeDeleteQuestionContent(
      templateUpdate.getUserTemplateId(),
    );
    const changedTemplate = super.changeUserTemplateType(
      templateUpdate.getTemplateContent(),
      templateUpdate.getUserTemplateId(),
    );
    await this.questionContentHelper.executeInsertQuestionContent(changedTemplate);
  }
}
