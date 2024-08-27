import { InternalServerErrorException } from "@nestjs/common";


export class ChallengesPerOrganization {

    private organization:string;
    private challengeId:number;
    private challenge:string;
    private challengeFinishSign: string



    constructor(
        organization:string,
        challengeId:number,
        challenge:string,
        challengeFinishSign: string
    ){
        this.setOrganization(organization);
        this.setChallengeId(challengeId);
        this.setChallenge(challenge);
        this.setChallengeFinishSign(challengeFinishSign);  
    }

    public static of(
        organization:string,
        challengeId:number,
        challenge:string,
        challengeFinishSign: string):ChallengesPerOrganization{
            return new ChallengesPerOrganization(organization, challengeId, challenge, challengeFinishSign);
    }


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

    public getChallengeId(){
        return this.challengeId;
    }

    public  getOrganization(){
        return this.organization;
    }

    public getChallengeFinishSign(){
        return this.challengeFinishSign;
    }

    public getChallenge(){
        return this.challenge;
    }

}