import { IsNotEmpty } from "class-validator";
import { ObjectiveAnswer } from "../ObjectiveAnswer.js";


export class ObjectiveQuestionAnswer{

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private challengeId:number;


    @IsNotEmpty()
    private satisfactionAnswer: Array<ObjectiveAnswer>;


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