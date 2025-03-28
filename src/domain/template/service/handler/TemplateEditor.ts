import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { TemplateUpdate } from '../../dto/request/TemplateUpdate';
import { TemplateOperation } from '../types/Operation';
import { Transactional } from 'src/global/decorator/transaction';
import { QuestionContentHelper } from '../../helper/QuestionContent.Helper';
import { WriteTemplateContent } from '../../dto/values/TemplateContent';
import { InsertUserTemplateContent } from '../../dto/values/InsertUserTemplateContent';

@Injectable()
export class TemplateEditor implements TemplateHandler<TemplateUpdate, Promise<void>> {
  operation: TemplateOperation = 'UPDATE_TEMPLATE';

  constructor(private readonly questionContentHelper: QuestionContentHelper) {}

  @Transactional()
  async handle(request: TemplateUpdate): Promise<void> {
    await this.questionContentHelper.executeDeleteQuestionContent(request.getUserTemplateId());
    const changedTemplate = this.changeUserTemplateType(
      request.getTemplateContent(),
      request.getUserTemplateId(),
    );
    await this.questionContentHelper.executeInsertQuestionContent(changedTemplate);
  }

  private changeUserTemplateType(
    writeTempletes: WriteTemplateContent[],
    userTempleteId: number,
  ): InsertUserTemplateContent[] {
    return writeTempletes.map((writeTemplete) =>
      InsertUserTemplateContent.of(
        writeTemplete.getQuestionId(),
        writeTemplete.getContent(),
        writeTemplete.getVisibility(),
        userTempleteId,
      ),
    );
  }
}
