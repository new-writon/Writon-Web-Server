import { Inject, Injectable } from '@nestjs/common';
import { BaseTemplateService } from './BaseTemplate.Service';
import { TemplateHandler } from '../../service/TemplateHandler';

@Injectable()
export class CommentService extends BaseTemplateService {
  constructor(@Inject('COMMENT_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }
}
