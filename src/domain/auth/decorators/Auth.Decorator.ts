import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import type { User } from '../../user/domain/entity/User.js';

declare module 'express' {
  interface Request {
    user: User | undefined;
  }
}

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().user;
  },
);
