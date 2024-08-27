import { IsNotEmpty } from "class-validator";
import { WriteTemplateContent } from "../values/TemplateContent.js";
import { Type } from "class-transformer";


export class TemplateUpdate{

    
    @IsNotEmpty()
    private userTemplateId: number;

    @Type(() => WriteTemplateContent)
    @IsNotEmpty()
    private templateContent:Array<WriteTemplateContent>;


    public getUserTemplateId(){
        return this.userTemplateId;
    }

    public getTemplateContent(){
        return this.templateContent;
    }
}