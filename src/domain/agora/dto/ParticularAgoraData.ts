

export class ParticularAgoraData{


    public agoraId: number;
    public question: string;
    public participateCount: number;
    public createdTime: Date;
    public createdDate:Date;
    public user_challenge_id:number;


    constructor(
        agoraId: number,
        question: string,
        participateCount: number,
        createdTime: Date,
        createdDate:Date,
        user_challenge_id:number
    ){
        this.setAgoraId(agoraId);
        this.setQuestion(question);
        this.setParticipateCount(participateCount);
        this.setCreatedTime(createdTime);
        this.setCreatedDate(createdDate);
        this.setUserChallengeId(user_challenge_id);
    }


    private setAgoraId(agora_id: number): void {
        this.agoraId = agora_id;
    }

    public getAgoraId(): number {
        return this.agoraId;
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

    private setUserChallengeId(user_challenge_id: number): void {
        this.user_challenge_id = user_challenge_id;
    }

    public getUserChallengeId(): number {
        return this.user_challenge_id;
    }
}