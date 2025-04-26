import { InternalServerErrorException } from '@nestjs/common';

export class AuthenticationCodeResponse {
  private code: number;

  constructor(code: number) {
    this.setCode(code);
  }

  public static of(code: number): AuthenticationCodeResponse {
    return new AuthenticationCodeResponse(code);
  }

  private setCode(code: number) {
    if (code === null) {
      throw new InternalServerErrorException(`${__dirname} : code 값이 존재하지 않습니다.`);
    }
    this.code = code;
  }
}
