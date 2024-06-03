import { IsNotEmpty } from "class-validator";


export class ReEngagementCheck{

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private challengeId:number;

    @IsNotEmpty()
    private check: boolean;


    public getOrganization(){
        return this.organization;
    }


    public getChallengeId(){
        return this.challengeId;
    }

    public getCheck(){
        return this.check;
    }


}