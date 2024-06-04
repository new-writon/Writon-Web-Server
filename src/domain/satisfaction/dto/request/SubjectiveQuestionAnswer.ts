import { IsNotEmpty } from "class-validator";
import { ObjectiveAnswer } from "../ObjectiveAnswer.js";
import { Type } from 'class-transformer';
import { SubjectiveAnswer } from "../SubjectiveAnswer.js";

export class SubjectiveQuestionAnswer{

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private challengeId:number;

    @Type(() => SubjectiveAnswer)
    @IsNotEmpty()
    private satisfactionAnswer: Array<SubjectiveAnswer>;


    public getOrganization(){
        return this.organization;
    }

    public getChallengeId(){
        return this.challengeId;
    }

    public getSatisfactionAnswer(){
        return this.satisfactionAnswer;
    }
    
}