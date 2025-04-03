import { Inject, Injectable } from '@nestjs/common';
import { BaseTemplateInputPort } from './BaseTemplateInputPort';
import { TemplateUseCase } from '../../service/TemplateUseCase';

@Injectable()
export class CommentInputPort extends BaseTemplateInputPort {
  constructor(@Inject('COMMENT_HANDLERS') handlers: TemplateUseCase<any, any>[]) {
    super(handlers);
  }
}
