import { Inject, Injectable } from '@nestjs/common';
import { BaseTemplateService } from './BaseTemplate.Service';
import { TemplateHandler } from './handler/TemplateHandler';

@Injectable()
export class TemplateService extends BaseTemplateService {
  constructor(@Inject('TEMPLATE_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }
}
