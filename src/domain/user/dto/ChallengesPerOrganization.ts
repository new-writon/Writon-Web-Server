import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class ChallengesPerOrganization {

    private organization:string;
    private challengeId:number;
    private challenge:string;
    private challengeFinishSign: string



    constructor(
        organization:string,
        challenge_id:number,
        challenge:string,
        challengeFinishSign: string
    ){
        this.setOrganization(organization);
        this.setChallengeId(challenge_id);
        this.setChallenge(challenge);
        this.setChallengeFinishSign(challengeFinishSign);  
    }

    public static of(challengesPerOrganization: ChallengesPerOrganization[]):ChallengesPerOrganization[]{
        return challengesPerOrganization.map((cpo)=>{
            return new ChallengesPerOrganization(cpo.organization, cpo.challengeId, cpo.challenge, cpo.challengeFinishSign);
        })

    }


    // setChallengesPerOrganization(challengesPerOrganization: ChallengesPerOrganization[]){
    //     if(challengesPerOrganization === null)throw new InternalServerErrorException (`${__dirname} : challengesPerOrganization값이 존재하지 않습니다.`);
    //     this.challengesPerOrganization=challengesPerOrganization;
    // }


    private setOrganization(organization:string){
        if(organization === null)throw new InternalServerErrorException (`${__dirname} : organization 값이 존재하지 않습니다.`);
        this.organization=organization;
    }

    private setChallengeId(challengeId:number){
        if(challengeId === null)throw new InternalServerErrorException (`${__dirname} : challengeId 값이 존재하지 않습니다.`);
        this.challengeId=challengeId;
    }

    private setChallengeFinishSign(challengeFinishSign:string){
        if(challengeFinishSign=== null)throw new InternalServerErrorException (`${__dirname} : challengeFinishSign값이 존재하지 않습니다.`);
        this.challengeFinishSign=challengeFinishSign;
    }

    private setChallenge(challenge:string){
        if(challenge === null)throw new InternalServerErrorException (`${__dirname} : challenge 값이 존재하지 않습니다.`);
        this.challenge=challenge;
    }

}