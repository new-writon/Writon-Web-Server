import { CommentHandler } from './handler/CommentHandler';
import { Inject, Injectable } from '@nestjs/common';
import { CommentOperation } from './types/comment';

@Injectable()
export class CommentService {
  private handleMap = new Map<string, CommentHandler<any, any>>();
  constructor(@Inject('COMMENT_HANDLERS') handlers: CommentHandler<any, any>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  private registerHandler(handler: CommentHandler<any, any>) {
    this.handleMap.set(handler.operation, handler);
  }

  async execute<Request extends unknown[] | unknown, Response>(
    operation: CommentOperation,
    ...request: Request extends unknown[] ? Request : [Request]
  ): Promise<Response> {
    const handler = this.handleMap.get(operation);
    if (!handler) throw Error('Handler Empty Error');
    return handler.handle(request) as Response;
  }
}
