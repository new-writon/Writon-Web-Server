import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { CookieOptions, Response } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import type { AuthConfig } from '~auth/config/auth';

import type { User } from '../../user/domain/entity/User.Entitiy.js';

@Injectable()
export class TokenInterceptor implements NestInterceptor {


  constructor(
    private readonly jwtService: JwtService,
   
  ) {
   
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((user) => {
     //   const token = this.generateToken(user);

       
        return user;
      }),
    );
  }

  public generateToken(userId: number, userRole: string): string {
    const payload = {
        id: userId,
        role: userRole,
      };
    return "Bearer " +this.jwtService.sign(payload);
  }
}
