import { TemplateOperation } from '../types/comment';

export interface TemplateHandler<Request, Response> {
  handle(request: Request): Response;
  operation: TemplateOperation;
}
