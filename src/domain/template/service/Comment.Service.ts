import { TemplateHandler } from './handler/TemplateHandler';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateOperation } from './types/comment';
import { BaseTemplateService } from './handler/BaseTemplate.Service';

@Injectable()
export class CommentService extends BaseTemplateService {
  constructor(@Inject('COMMENT_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }
}
