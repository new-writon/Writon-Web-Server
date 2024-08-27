import { InternalServerErrorException } from "@nestjs/common";
import { ObjectiveAnswer } from "./ObjectiveAnswer";


export class ObjectiveAnswerType{
    private satisfactionId: number;
    private score: number;
    private userChallengeId: number;


    constructor(satisfactionId: number, score: number, userChallengeId: number) {
        this.setSatisfactionId(satisfactionId);
        this.setScore(score);
        this.setUserChallengeId(userChallengeId);
    }

    public static of(
        satisfationAnswer: ObjectiveAnswer,
        userChallengeId:number
    ){
        return new ObjectiveAnswerType(satisfationAnswer.getSatisfactionId(), satisfationAnswer.getScore(), userChallengeId);
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