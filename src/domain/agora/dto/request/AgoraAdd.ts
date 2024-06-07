import { IsNotEmpty } from "class-validator";



export class AgoraAdd{

    @IsNotEmpty()
    private challengeId:number;

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private agoraQuestion:string;


    public getChallengeId(){
        return this.challengeId;
    }

    public getOrganization(){
        return this.organization;
    }

    public getAgoraQuestion(){
        return this.agoraQuestion;
    }
}