import { IsNotEmpty } from "class-validator";
import { WriteTemplateContent } from "../TemplateContent.js";
import { Type } from "class-transformer";


export class TemplateWrite{

    
    @IsNotEmpty()
    private organization: string;


    @IsNotEmpty()
    private challengeId: number;

    @IsNotEmpty()
    private date: string;

    @Type(() => WriteTemplateContent)
    @IsNotEmpty()
    private templateContent:Array<WriteTemplateContent>;


    public getOrganization(){
        return this.organization;
    }

    public getChallengeId(){
        return this.challengeId;
    }

    public getDate(){
        return this.date;
    }

    public getTemplateContent(){
        return this.templateContent;
    }
}