import {HttpException, HttpStatus} from "@nestjs/common";
import { AgoraErrorCode, errorMessage } from "./AgoraErrorCode.js";

export class AgoraException extends HttpException {
    code: AgoraErrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: AgoraErrorCode) {
        super(errorMessage(code), code);  
    }
}