import { Injectable } from "@nestjs/common";
import { UserTemplate } from "../entity/UserTemplate";
import { checkData } from "../../util/checker";
import { TemplateException } from "../../exception/TemplateException";
import { TemplateErrorCode } from "../../exception/TemplateErrorCode";
import { Comment } from "../entity/Comment";
import { Likes } from "../entity/Likes";
import { QuestionContent } from "../entity/QuestionContent";
import { TemplateContent } from "../../dto/response/TemplateContent";



@Injectable()
export class TemplateVerifyService{

    public verifyUserTemplates(userTemplates:UserTemplate[] ){
        if(!checkData(userTemplates[0]))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_USERTEMPLATE);
    }

    public verifyUserTemplate(userTemplate:UserTemplate){
        if(!checkData(userTemplate))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_USERTEMPLATE);
    }

    public verifyComment(comment:Comment){
        if(!checkData(comment))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_COMMENT);
    }
    public verifyComments(comments:Comment[]){
        if(!checkData(comments))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_COMMENT);
    }

    public verifyLikes(likes:Likes[]){
        if(!checkData(likes[0]))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_LIKE);
    }

    public verifyTemplateContents(templateContents:TemplateContent[]){
        if(!checkData(templateContents[0]))
            throw new TemplateException(TemplateErrorCode.NOT_FOUND_TEMPLATE_CONTENT);
    }


}