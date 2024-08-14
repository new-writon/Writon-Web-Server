import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ParticularSmallTalkData{


    public smallTalkId: number;
    public question: string;
    public participateCount: number;
    public createdTime: Date;
    public createdDate:Date;
    public userChallengeId:number;


    constructor(
        smallTalkId: number,
        question: string,
        participateCount: number,
        createdTime: Date,
        createdDate:Date,
        userChallengeId:number
    ){
        this.setSmallTalkId(smallTalkId);
        this.setQuestion(question);
        this.setParticipateCount(participateCount);
        this.setCreatedTime(createdTime);
        this.setCreatedDate(createdDate);
        this.setUserChallengeId(userChallengeId);
    }


    private setSmallTalkId(smallTalkId: number): void {
        this.smallTalkId=smallTalkId;
    }

    public getSmallTalkId(): number {
        return this.smallTalkId;
    }

    private setQuestion(question: string): void {
        this.question = question;
    }

    public getQuestion(): string {
        return this.question;
    }

    private setParticipateCount(participate_count: number): void {
        this.participateCount = participate_count;
    }

    public getParticipateCount(): number {
        return this.participateCount;
    }

    private setCreatedTime(created_time: Date): void {
        this.createdTime = created_time;
    }

    public getCreatedTime(): Date {
        return this.createdTime;
    }

    private setCreatedDate(created_date: Date): void {
        this.createdDate = created_date;
    }

    public getCreatedDate(): Date {
        return this.createdDate;
    }

    private setUserChallengeId(userChallengeId: number): void {
        this.userChallengeId=userChallengeId;
    }

    public getUserChallengeId(): number {
        return this.userChallengeId;
    }
}