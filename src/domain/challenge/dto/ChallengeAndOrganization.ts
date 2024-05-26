import { InternalServerErrorException } from "@nestjs/common";


export class ChallengeAndOrganization{
    private organization: string;
    private challenge: string;


    constructor(organization:string, challenge:string){
        this.setOrganization(organization);
        this.setChallenge(challenge);
    }


    public static of(challengeAndOrganizationArrayData:ChallengeAndOrganization[]){
        return challengeAndOrganizationArrayData.map((data)=>{
            return new ChallengeAndOrganization(data.organization, data.challenge);
        });
    }



    public getOrganization(){
        return this.organization;
    }

    public getChallenge(){
        return this.challenge;
    }


    private setOrganization(organization: string) {
        if(organization === null)throw new InternalServerErrorException (`${__dirname} : organization 값이 존재하지 않습니다.`);
        this.organization = organization;
    }

    private setChallenge(challenge: string) {
        if(challenge === null)throw new InternalServerErrorException (`${__dirname} : challenge 값이 존재하지 않습니다.`);
        this.challenge = challenge;
    }

}