import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { TemplateUpdate } from '../../dto/request/TemplateUpdate';
import { TemplateOperation } from '../types/Operation';
import { Transactional } from 'src/global/decorator/transaction';
import { QuestionContentHelper } from '../../helper/QuestionContent.Helper';
import { TemplateWriter } from './TemplateWriter';

@Injectable()
export class TemplateEditor
  extends TemplateWriter
  implements TemplateHandler<TemplateUpdate, Promise<void>>
{
  operation: TemplateOperation = 'UPDATE_TEMPLATE';

  constructor(private readonly questionContentHelper: QuestionContentHelper) {
    super();
  }

  @Transactional()
  async handle(request: TemplateUpdate): Promise<void> {
    await this.questionContentHelper.executeDeleteQuestionContent(request.getUserTemplateId());
    const changedTemplate = super.changeUserTemplateType(
      request.getTemplateContent(),
      request.getUserTemplateId(),
    );
    await this.questionContentHelper.executeInsertQuestionContent(changedTemplate);
  }
}
