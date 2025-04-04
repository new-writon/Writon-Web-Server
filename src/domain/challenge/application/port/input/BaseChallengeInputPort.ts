import { ChallengeOperation } from '../../service/types/Operation';
import { ChallengeUseCase } from './ChallengeUseCase';

export abstract class BaseChallengeInputPort {
  private handleMap = new Map<string, ChallengeUseCase<any, any>>();
  constructor(handlers: ChallengeUseCase<any, any>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }
  protected registerHandler(handler: ChallengeUseCase<any, any>) {
    this.handleMap.set(handler.operation, handler);
  }

  async execute<Request extends unknown[] | unknown, Response>(
    operation: ChallengeOperation,
    ...request: Request extends unknown[] ? Request : [Request]
  ): Promise<Response> {
    const handler = this.handleMap.get(operation);
    if (!handler) throw Error('Handler Empty Error');
    return handler.handle(request) as Response;
  }
}
