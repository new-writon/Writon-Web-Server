import {HttpException, HttpStatus} from "@nestjs/common";
import { ChallengeErrorCode, errorMessage } from "./ChallengeErrorCode.js";

export class ChallengeException extends HttpException {
    code: ChallengeErrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: ChallengeErrorCode) {
        super(errorMessage(code), code);  
    }
}