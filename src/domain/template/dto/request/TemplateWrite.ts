import { IsNotEmpty } from "class-validator";
import { TemplateContent } from "../response/TemplateContent";
import { WriteTemplateContent } from "../TemplateContent";


export class TemplateWrite{

    
    @IsNotEmpty()
    private organization: string;


    @IsNotEmpty()
    private challengeId: number;

    @IsNotEmpty()
    private date: string;

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