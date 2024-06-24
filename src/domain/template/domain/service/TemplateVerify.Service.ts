import { Injectable } from "@nestjs/common";
import { UserTemplete } from "../entity/UserTemplete.js";
import { checkData } from "../../util/checker.js";
import { TemplateException } from "../../exception/TemplateException.js";
import { TemplateErrorCode } from "../../exception/TemplateErrorCode.js";
import { Comment } from "../entity/Comment.js";
import { Affiliation } from "../../../user/domain/entity/Affiliation.js";


@Injectable()
export class TemplateVerifyService{

    public verifyUserTemplate(userTemplate:UserTemplete[]){
        if(!checkData(userTemplate))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_USERTEMPLATE);
    }

    public verifyComment(comment:Comment){
        if(!checkData(comment))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_COMMENT);
    }


    public verifyCommentCount(comment:Comment[]){
        if(!checkData(comment[0]))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_COMMENT);
    }


}