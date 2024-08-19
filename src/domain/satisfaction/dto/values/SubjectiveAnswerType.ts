
import { InternalServerErrorException } from "@nestjs/common";


export class SubjectiveAnswerType{
    private satisfactionId: number;
    private answer:string;
    private userChallengeId: number;


    constructor(satisfactionId: number, answer:string, userChallengeId: number) {
        this.setSatisfactionId(satisfactionId);
        this.setAnswer(answer)
        this.setUserChallengeId(userChallengeId);
    }

    public getSatisfactionId(){
        return this.satisfactionId;
    }

    public getAnswer(){
        return this.answer;
    }

    public getUserChallengeId(){
        return this.userChallengeId;
    }

    private setSatisfactionId(satisfactionId: number) {
        if(satisfactionId=== null)throw new InternalServerErrorException (`${__dirname} : satisfactionId 값이 존재하지 않습니다.`);
        this.satisfactionId = satisfactionId;
    }
s
    private setAnswer(answer: string) {
        if(answer === null)throw new InternalServerErrorException (`${__dirname} : answer 값이 존재하지 않습니다.`);
        this.answer=answer;
    }

    private setUserChallengeId(userChallengeId: number) {
        if(userChallengeId === null)throw new InternalServerErrorException (`${__dirname} : userChallengeId 값이 존재하지 않습니다.`);
        this.userChallengeId = userChallengeId;
    }
}