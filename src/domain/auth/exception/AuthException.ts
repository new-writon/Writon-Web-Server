import {HttpException, HttpStatus} from "@nestjs/common";
import { AuthErrorCode, errorMessage } from "./AuthErrorCode.js";

export class AuthException extends HttpException {
    code: AuthErrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: AuthErrorCode) {
        super(errorMessage(code), code);  
    }
}