import { TemplateOperation } from '../../service/types/Operation';
import { TemplateUseCase } from './TemplateUseCase';

export abstract class BaseTemplateInputPort {
  private handleMap = new Map<string, TemplateUseCase<any, any>>();
  constructor(handlers: TemplateUseCase<any, any>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }
  protected registerHandler(handler: TemplateUseCase<any, any>) {
    this.handleMap.set(handler.operation, handler);
  }

  async execute<Request extends unknown[] | unknown, Response>(
    operation: TemplateOperation,
    ...request: Request extends unknown[] ? Request : [Request]
  ): Promise<Response> {
    const handler = this.handleMap.get(operation);
    if (!handler) {
      throw Error('Handler Empty Error');
    }
    return handler.handle(request) as Response;
  }
}
