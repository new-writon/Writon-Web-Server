

export class ParticularAgoraData{


    public agora_id: number;
    public question: string;
    public participate_count: number;
    public created_time: Date;
    public created_date:Date;
    public user_challenge_id:number;


    constructor(
        agora_id: number,
        question: string,
        participate_count: number,
        created_time: Date,
        created_date:Date,
        user_challenge_id:number
    ){
        this.setAgoraId(agora_id);
        this.setQuestion(question);
        this.setParticipateCount(participate_count);
        this.setCreatedTime(created_time);
        this.setCreatedDate(created_date);
        this.setUserChallengeId(user_challenge_id);
    }


    private setAgoraId(agora_id: number): void {
        this.agora_id = agora_id;
    }

    public getAgoraId(): number {
        return this.agora_id;
    }

    private setQuestion(question: string): void {
        this.question = question;
    }

    public getQuestion(): string {
        return this.question;
    }

    private setParticipateCount(participate_count: number): void {
        this.participate_count = participate_count;
    }

    public getParticipateCount(): number {
        return this.participate_count;
    }

    private setCreatedTime(created_time: Date): void {
        this.created_time = created_time;
    }

    public getCreatedTime(): Date {
        return this.created_time;
    }

    private setCreatedDate(created_date: Date): void {
        this.created_date = created_date;
    }

    public getCreatedDate(): Date {
        return this.created_date;
    }

    private setUserChallengeId(user_challenge_id: number): void {
        this.user_challenge_id = user_challenge_id;
    }

    public getUserChallengeId(): number {
        return this.user_challenge_id;
    }
}