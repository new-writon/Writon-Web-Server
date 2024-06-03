import {HttpException, HttpStatus} from "@nestjs/common";
import { SatisfactionErrorCode, errorMessage } from "./SatisfactionErrorCode.js";

export class SatisfactionException extends HttpException {
    code: SatisfactionErrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: SatisfactionErrorCode) {
        super(errorMessage(code), code);  
    }
}