import { IsNotEmpty } from "class-validator";
import { WriteTemplateContent } from "../TemplateContent.js";


export class TemplateUpdate{

    
    @IsNotEmpty()
    private userTemplateId: number;

    @IsNotEmpty()
    private templateContent:Array<WriteTemplateContent>;


    public getUserTemplateId(){
        return this.userTemplateId;
    }

    public getTemplateContent(){
        return this.templateContent;
    }
}