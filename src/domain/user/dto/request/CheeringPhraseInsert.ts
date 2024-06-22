import { IsNotEmpty } from "class-validator";


export class CheeringPhraseInsert{

    @IsNotEmpty()
    private organization: string;

    @IsNotEmpty()
    private challengeId: number;

    @IsNotEmpty()
    private content: string;

    public getOrganization(){
        return this.organization;
    }

    public getChallengeId(){
        return this.challengeId;
    }

    public getContent(){
        return this.content;
    }
}