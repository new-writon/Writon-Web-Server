import { TemplateHandler } from './handler/TemplateHandler';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateOperation } from './types/Operation';
import { BaseTemplateService } from './BaseTemplate.Service';

@Injectable()
export class CommentService extends BaseTemplateService {
  constructor(@Inject('COMMENT_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }
}
