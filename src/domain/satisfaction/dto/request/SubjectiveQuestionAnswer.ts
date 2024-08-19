import { IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';
import { SubjectiveAnswer } from "../values/SubjectiveAnswer";

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