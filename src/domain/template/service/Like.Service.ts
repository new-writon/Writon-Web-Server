import { Inject, Injectable } from '@nestjs/common';
import { TemplateHandler } from './handler/TemplateHandler';
import { BaseTemplateService } from './BaseTemplate.Service';

@Injectable()
export class LikeServie extends BaseTemplateService {
  constructor(@Inject('LIKE_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }
}
