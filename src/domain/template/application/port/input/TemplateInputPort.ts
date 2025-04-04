import { Inject, Injectable } from '@nestjs/common';
import { BaseTemplateInputPort } from './BaseTemplateInputPort';
import { TemplateUseCase } from './TemplateUseCase';

@Injectable()
export class TemplateInputPort extends BaseTemplateInputPort {
  constructor(@Inject('TEMPLATE_HANDLERS') handlers: TemplateUseCase<any, any>[]) {
    super(handlers);
  }
}
