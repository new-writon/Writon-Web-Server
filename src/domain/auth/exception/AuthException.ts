import {HttpException, HttpStatus} from "@nestjs/common";
import { AuthErrorCode, errorMessage } from "./AuthErrorCode.js";

export class AuthException extends HttpException {
    code: AuthErrorCode; 

    constructor(code: AuthErrorCode) {
        super(errorMessage(code), code);  
    }
}