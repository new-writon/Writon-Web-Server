import { TemplateContent } from "./TemplateContent";


export class TemplateInformation{
    private challengeCompleteCount:number;
    private templateData:TemplateContent[][];

    constructor(
        challengeCompleteCount:number,
        templateData:TemplateContent[][]
    ){
        this.setChallengeCompleteCount(challengeCompleteCount);
        this.setTemplateData(templateData);
    }

    public static of(challengeCompleteCount:number, templateData:TemplateContent[][]){
        return new TemplateInformation(challengeCompleteCount, templateData);
    }


    private setChallengeCompleteCount(challengeCompleteCount:number){
        this.challengeCompleteCount=challengeCompleteCount;
    };

    private setTemplateData(templateData:TemplateContent[][]){
        this.templateData=templateData;
    }
}