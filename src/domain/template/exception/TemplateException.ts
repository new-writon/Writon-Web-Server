import {HttpException} from "@nestjs/common";
import { TemplateErrorCode, errorMessage } from "./TemplateErrorCode";


export class TemplateException extends HttpException {
    code: TemplateErrorCode; // enum 값의 타입을 설정합니다.

    constructor(code: TemplateErrorCode) {
        super(errorMessage(code), code);  
    }
}