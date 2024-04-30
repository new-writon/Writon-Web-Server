import { IsNotEmpty } from "class-validator";


export class KakaoLoginRequest{

    @IsNotEmpty()
    private organization: string;


    @IsNotEmpty()
    private challengeId: number;

    public getOrganization(): string {
        return this.organization;
    }

    public getChallengeId(): number {
        return this.challengeId;
    }
    
}