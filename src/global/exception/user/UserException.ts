import { HttpException } from '@nestjs/common';
import { UserErrorCode, errorMessage } from './UserErrorCode';

export class UserException extends HttpException {
  code: UserErrorCode;

  constructor(code: UserErrorCode) {
    super(errorMessage(code), code);
  }
}
