import { TemplateOperation } from '../../service/types/Operation';

export interface TemplateUseCase<Request, Response> {
  handle(request: Request): Response;
  operation: TemplateOperation;
}
