import { InternalServerErrorException } from '@nestjs/common';

export class Token {
  private accessToken: string;
  private refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  public static of(accessToken: string, refreshToken: string) {
    return new Token(accessToken, refreshToken);
  }

  private setAccessToken(accessToken: string) {
    if (accessToken === null) {
      throw new InternalServerErrorException(`${__dirname} : AccessToken 값이 존재하지 않습니다.`);
    }
    this.accessToken = accessToken;
  }

  private setRefreshToken(refreshToken: string) {
    if (refreshToken === null) {
      throw new InternalServerErrorException(`${__dirname} : RefreshToken 값이 존재하지 않습니다.`);
    }
    this.refreshToken = refreshToken;
  }
}
