import { InternalServerErrorException } from "@nestjs/common";


export class ChallengeStatus {

    private challengeStatus: boolean;

    constructor(challengeStatus: boolean){
        this.setStatus(challengeStatus);
    }

    public static of(challengeStatus: boolean){
        return new ChallengeStatus(challengeStatus);

    }

    setStatus(challengeStatus: boolean){
        if(challengeStatus === null)throw new InternalServerErrorException (`${__dirname} : status 값이 존재하지 않습니다.`);
        this.challengeStatus=challengeStatus
    }


}