import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ObjectiveAnswerType{
    private satisfactionId: number;
    private score: number;
    private userChallengeId: number;


    constructor(satisfactionId: number, score: number, userChallengeId: number) {
        this.setSatisfactionId(satisfactionId);
        this.setScore(score);
        this.setUserChallengeId(userChallengeId);
    }

    public getSatisfactionId(){
        return this.satisfactionId;
    }

    public getScore(){
        return this.score;
    }

    public getUserChallengeId(){
        return this.userChallengeId;
    }

    private setSatisfactionId(satisfactionId: number) {
        if(satisfactionId=== null)throw new InternalServerErrorException (`${__dirname} : satisfactionId 값이 존재하지 않습니다.`);
        this.satisfactionId = satisfactionId;
    }

    private setScore(score: number) {
        if(score === null)throw new InternalServerErrorException (`${__dirname} : score값이 존재하지 않습니다.`);
        this.score = score;
    }

    private setUserChallengeId(userChallengeId: number) {
        if(userChallengeId === null)throw new InternalServerErrorException (`${__dirname} : userChallengeId 값이 존재하지 않습니다.`);
        this.userChallengeId = userChallengeId;
    }
}