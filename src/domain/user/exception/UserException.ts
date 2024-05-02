import {HttpException, HttpStatus} from "@nestjs/common";
import { UserErrorCode, errorMessage } from "./UserErrorCode.js";

export class UserException extends HttpException {
    code: UserErrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: UserErrorCode) {
        super(errorMessage(code), code);  
    }
}