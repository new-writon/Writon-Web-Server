import { HttpException } from '@nestjs/common';
import { ChallengeErrorCode, errorMessage } from './ChallengeErrorCode';

export class ChallengeException extends HttpException {
  code: ChallengeErrorCode;

  constructor(code: ChallengeErrorCode) {
    super(errorMessage(code), code);
  }
}
