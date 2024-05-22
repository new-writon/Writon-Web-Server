import { InternalServerErrorException } from "@nestjs/common";



export class ChallengesPerOrganization {

    private challengesPerOrganization: ChallengesPerOrganization[];

    constructor(challengesPerOrganization: ChallengesPerOrganization[]){
        this.setChallengesPerOrganization(challengesPerOrganization)
        
    }

    public static of(challengesPerOrganization: ChallengesPerOrganization[]){
        return new ChallengesPerOrganization(challengesPerOrganization);
    }


    setChallengesPerOrganization(challengesPerOrganization: ChallengesPerOrganization[]){
        if(challengesPerOrganization === null)throw new InternalServerErrorException (`${__dirname} : challengesPerOrganization값이 존재하지 않습니다.`);
        this.challengesPerOrganization=challengesPerOrganization;
    }

}