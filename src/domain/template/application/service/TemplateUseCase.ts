import { TemplateOperation } from './types/Operation';

export interface TemplateUseCase<Request, Response> {
  handle(request: Request): Response;
  operation: TemplateOperation;
}
