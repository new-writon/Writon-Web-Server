import {HttpException, HttpStatus} from "@nestjs/common";
import { TestErrorCode, errorMessage } from "./TestErrorCode.js";

export class CustomException extends HttpException {
    code: TestErrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: TestErrorCode) {
        super(errorMessage(code), code);  
    }
}