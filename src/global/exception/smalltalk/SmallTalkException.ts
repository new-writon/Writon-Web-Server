import { HttpException } from '@nestjs/common';
import { SmallTalkErrorCode, errorMessage } from './SmallTalkErrorCode';

export class SmallTalkException extends HttpException {
  code: SmallTalkErrorCode;

  constructor(code: SmallTalkErrorCode) {
    super(errorMessage(code), code);
  }
}
