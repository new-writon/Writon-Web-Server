import { InternalServerErrorException } from "@nestjs/common";


export class ChallengeAccordingToOrganization {
    private organization: string;
    private challenges: string[];
 
    constructor(organization: string, challenges: string[]) {
        this.setOrganization(organization);
        this.setChallenges(challenges);
    }

    public static of(challengeAccordingToOrganizationArrayData:ChallengeAccordingToOrganization[]){
        return challengeAccordingToOrganizationArrayData.map((data)=>{
            return new ChallengeAccordingToOrganization(data.organization, data.challenges)
        })
    }

    public getOrganization(): string {
        return this.organization;
    }

    public getChallenges(): string[] {
        return this.challenges;
    }

    public setOrganization(organization: string): void {
        if(organization === null)throw new InternalServerErrorException (`${__dirname} : organization 값이 존재하지 않습니다.`);
        this.organization = organization;
    }

    public setChallenges(challenges: string[]): void {
        if(challenges === null)throw new InternalServerErrorException (`${__dirname} : challenges 값이 존재하지 않습니다.`);
        this.challenges = challenges;
    }
}
