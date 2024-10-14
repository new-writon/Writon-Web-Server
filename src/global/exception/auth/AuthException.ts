import { HttpException } from '@nestjs/common';
import { AuthErrorCode, errorMessage } from './AuthErrorCode';

export class AuthException extends HttpException {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super(errorMessage(code), code);
  }
}
