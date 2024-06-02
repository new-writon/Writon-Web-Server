import {HttpException, HttpStatus} from "@nestjs/common";
import { SatisfationrrorCode, errorMessage } from "./SatisfactionErrorCode.js";

export class SatisfactionException extends HttpException {
    code: SatisfationrrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: SatisfationrrorCode) {
        super(errorMessage(code), code);  
    }
}