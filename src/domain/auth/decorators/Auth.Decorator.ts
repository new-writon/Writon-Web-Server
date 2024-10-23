import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { User } from '../../user/domain/entity/User';

declare module 'express' {
  interface Request {
    user: User;
  }
}

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().user as User;
  },
);
