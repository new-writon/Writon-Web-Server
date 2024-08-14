import {HttpException, HttpStatus} from "@nestjs/common";
import { SmallTalkErrorCode, errorMessage } from "./SmallTalkErrorCode.js";

export class SmallTalkException extends HttpException {
    code: SmallTalkErrorCode // enum 값의 타입을 설정합니다.

    constructor(code: SmallTalkErrorCode) {
        super(errorMessage(code), code);  
    }
}