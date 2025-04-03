import { TemplateOperation } from '../../service/types/Operation';

export interface TemplateHandler<Request, Response> {
  handle(request: Request): Response;
  operation: TemplateOperation;
}
