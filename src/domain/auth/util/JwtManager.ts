import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

import { ConfigService } from '@nestjs/config';
import { LoginTokenManager } from './LoginTokenManager';

@Injectable()
export class JwtManager {
  constructor(
    private readonly loginTokenManager: LoginTokenManager,
    private readonly configService: ConfigService,
  ) {}

  public makeAccessToken = (userId: number, userRole: string): string => {
    const payload = {
      userId: userId,
      role: userRole,
    };
    return (
      'Bearer ' +
      jwt.sign(payload, this.configService.get<string>('jwt.secret'), {
        algorithm: this.configService.get<string>(
          'jwt.algorithm',
        ) as jwt.Algorithm,
        expiresIn: this.configService.get<string>('jwt.access_token'),
      })
    );
  };

  public makeRefreshToken = () => {
    return (
      'Bearer ' +
      jwt.sign({}, this.configService.get<string>('jwt.secret'), {
        algorithm: this.configService.get<string>(
          'jwt.algorithm',
        ) as jwt.Algorithm,
        expiresIn: this.configService.get<string>('jwt.refresh_token'),
      })
    );
  };

  public decode = (token: string) => {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      return {
        message: 'Ok',
        userId: decoded.userId,
        role: decoded.role,
      };
    } catch (err) {
      console.log(err);
    }
  };

  public verify = (token: string) => {
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get<string>('jwt.secret'),
      ) as JwtPayload;
      return {
        state: true,
        userId: decoded!.userId,
        role: decoded!.role,
      };
    } catch (err) {
      return {
        state: false,
      };
    }
  };

  // public refreshVerify = async (requestToken: string, userId: number) => {
  //   try {
  //     let responseToken = (await this.loginTokenManager.getToken(
  //       String(userId),
  //     )) as string[]; // 배열 스트링
  //     console.log(responseToken);
  //     if (requestToken === null) {
  //       responseToken = (await this.loginTokenManager.getToken(
  //         String(userId),
  //       )) as string[];
  //       console.log(responseToken);
  //     }

  //     if (this.verifyToken(requestToken, responseToken)) {
  //       jwt.verify(
  //         requestToken.split('Bearer ')[1],
  //         this.configService.get<string>('jwt.secret'),
  //       ) as JwtPayload;
  //       return { state: true, token: requestToken };
  //     }
  //     return { state: false };
  //   } catch (err) {
  //     return { state: false };
  //   }
  // };

  public refreshVerify = async (requestToken: string, userId: number) => {
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const responseToken = (await this.loginTokenManager.getToken(
          String(userId),
        )) as string[];
        console.log(
          'Attempt',
          retryCount + 1,
          'Response Token:',
          responseToken,
        );

        if (responseToken === null) {
          retryCount++;
          if (retryCount < maxRetries) {
            console.log(
              `Token is null, retrying... (${retryCount}/${maxRetries})`,
            );
            await new Promise((resolve) => setTimeout(resolve, 300)); // 1초 대기
            continue;
          }
        }

        if (this.verifyToken(requestToken, responseToken)) {
          jwt.verify(
            requestToken.split('Bearer ')[1],
            this.configService.get<string>('jwt.secret'),
          ) as JwtPayload;
          return { state: true, token: requestToken };
        }
        return { state: false };
      } catch (err) {
        console.error('Error in refreshVerify:', err);
        retryCount++;
      }
    }

    console.error('Max retries reached, token still null');
    return { state: false };
  };

  // private verifyToken(externalToken: string, internalToken: string): boolean{
  //     if(externalToken.split('Bearer ')[1] === internalToken.split('Bearer ')[1])
  //         return true;
  //     return false;
  // }

  private verifyToken(
    externalToken: string,
    internalTokens: string[],
  ): boolean {
    if (internalTokens.includes(externalToken)) {
      return true;
    }
    return false;
  }
}
