import { TemplateHandler } from '../../service/TemplateHandler';
import { TemplateOperation } from '../../service/types/Operation';

export abstract class BaseTemplateService {
  private handleMap = new Map<string, TemplateHandler<any, any>>();
  constructor(handlers: TemplateHandler<any, any>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }
  protected registerHandler(handler: TemplateHandler<any, any>) {
    this.handleMap.set(handler.operation, handler);
  }

  async execute<Request extends unknown[] | unknown, Response>(
    operation: TemplateOperation,
    ...request: Request extends unknown[] ? Request : [Request]
  ): Promise<Response> {
    const handler = this.handleMap.get(operation);
    if (!handler) throw Error('Handler Empty Error');
    return handler.handle(request) as Response;
  }
}
