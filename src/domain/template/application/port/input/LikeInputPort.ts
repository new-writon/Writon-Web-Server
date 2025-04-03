import { Inject, Injectable } from '@nestjs/common';
import { BaseTemplateInputPort } from './BaseTemplateInputPort';
import { TemplateUseCase } from '../../service/TemplateUseCase';

@Injectable()
export class LikeInputPort extends BaseTemplateInputPort {
  constructor(@Inject('LIKE_HANDLERS') handlers: TemplateUseCase<any, any>[]) {
    super(handlers);
  }
}
