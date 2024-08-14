import { IsNotEmpty } from "class-validator";



export class SmallTalkAdd{

    @IsNotEmpty()
    private challengeId:number;

    @IsNotEmpty()
    private organization:string;

    @IsNotEmpty()
    private smallTalkQuestion:string;


    public getChallengeId(){
        return this.challengeId;
    }

    public getOrganization(){
        return this.organization;
    }

    public getAgoraQuestion(){
        return this.smallTalkQuestion;
    }
}