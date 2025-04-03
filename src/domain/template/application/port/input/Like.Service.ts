import { Inject, Injectable } from '@nestjs/common';
import { BaseTemplateService } from './BaseTemplate.Service';
import { TemplateHandler } from './TemplateHandler';

@Injectable()
export class LikeServie extends BaseTemplateService {
  constructor(@Inject('LIKE_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }
}
