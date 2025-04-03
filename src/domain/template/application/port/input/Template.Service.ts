import { Inject, Injectable } from '@nestjs/common';
import { BaseTemplateService } from './BaseTemplate.Service';
import { TemplateHandler } from '../../service/TemplateHandler';

@Injectable()
export class TemplateService extends BaseTemplateService {
  constructor(@Inject('TEMPLATE_HANDLERS') handlers: TemplateHandler<any, any>[]) {
    super(handlers);
  }
}
