import {HttpException, HttpStatus} from "@nestjs/common";
import { SatisfactionErrorCode, errorMessage } from "./SatisfactionErrorCode";

export class SatisfactionException extends HttpException {
    code: SatisfactionErrorCode; 

    constructor(code: SatisfactionErrorCode) {
        super(errorMessage(code), code);  
    }
}