import { IsNotEmpty, Length } from "class-validator";

export class LocalLogin {

    @IsNotEmpty()
    @Length(20)
    private identifier: string;

    @IsNotEmpty()
    @Length(20)
    private password: string;

    @IsNotEmpty()
    private organization: string;

    @IsNotEmpty()
    private challengeId: number;

    public getIdentifier(): string {
        return this.identifier;
    }

    public getPassword(): string {
        return this.password;
    }


    public getOrganization(): string {
        return this.organization;
    }

    public getChallengeId(): number {
        return this.challengeId;
    }
    

}