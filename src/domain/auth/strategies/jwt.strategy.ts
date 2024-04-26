import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { User } from '../../user/domain/entity/User.Entitiy.js';



declare module 'express' {
  interface Request {
    cookies: Record<string, string | null>;
    signedCookies: Record<string, string | null>;
  }
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    //private readonly authenticationService: AuthenticationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
    
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }


  async validate(payload: any) {
    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
