import { Injectable } from "@nestjs/common";
import { UserTemplete } from "../entity/UserTemplete.js";
import { checkData } from "../../util/checker.js";
import { TemplateException } from "../../exception/TemplateException.js";
import { TemplateErrorCode } from "../../exception/TemplateErrorCode.js";


@Injectable()
export class TemplateVerifyService{

    public verifyUserTemplate(userTemplate:UserTemplete[]){
        if(!checkData(userTemplate))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_USERTEMPLATE);
    }


}