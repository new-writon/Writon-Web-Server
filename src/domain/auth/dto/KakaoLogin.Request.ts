import { IsNotEmpty } from "class-validator";


export class KakaoLoginRequest{

    @IsNotEmpty()
    public organization: string;


    @IsNotEmpty()
    public challengeId: number;

    public getOrganization(): string {
        return this.organization;
    }

    public getChallengeId(): number {
        return this.challengeId;
    }
    
}