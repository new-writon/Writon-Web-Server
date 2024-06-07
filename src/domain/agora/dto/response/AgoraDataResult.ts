import { InternalServerErrorException } from "@nestjs/common";

export class AgoraDataResult {
    private agoraId: number;
    private question: string;
    private participateCount: number;
    private nickname: string;
    private createdTime: Date;
    private createdDate: Date;
    private profile: string | null;
    private myAgoraSign: string;

    constructor(
        agoraId: number,
        question: string,
        participateCount: number,
        nickname: string,
        createdTime: Date,
        createdDate: Date,
        profile: string | null,
        myAgoraSign: string
    ) {
        this.setAgoraId(agoraId);
        this.setQuestion(question);
        this.setParticipateCount(participateCount);
        this.setNickname(nickname);
        this.setCreatedTime(createdTime);
        this.setCreatedDate(createdDate);
        this.setProfile(profile);
        this.setMyAgoraSign(myAgoraSign);
    }

    public static of(
        agoraDataResult:AgoraDataResult[]
    ) {
        return agoraDataResult.map((data) => new AgoraDataResult(data.agoraId, data.question, data.participateCount, data.nickname, data.createdTime, data.createdDate, data.profile, data.myAgoraSign))
    }

    private setAgoraId(agoraId: number) {
        if (agoraId === null || agoraId === undefined) throw new InternalServerErrorException(`${__dirname} : agoraId 값이 존재하지 않습니다.`);
        this.agoraId = agoraId;
    }

    private setQuestion(question: string) {
        if (!question) throw new InternalServerErrorException(`${__dirname} : question 값이 존재하지 않습니다.`);
        this.question = question;
    }

    private setParticipateCount(participateCount: number) {
        if (!participateCount) throw new InternalServerErrorException(`${__dirname} : participateCount 값이 존재하지 않습니다.`);
        this.participateCount = participateCount;
    }

    private setNickname(nickname: string) {
        if (!nickname) throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname = nickname;
    }

    private setCreatedTime(createdTime: Date) {
        if (!createdTime) throw new InternalServerErrorException(`${__dirname} : createdTime 값이 존재하지 않습니다.`);
        this.createdTime = createdTime;
    }

    private setCreatedDate(createdDate: Date) {
        if (!createdDate) throw new InternalServerErrorException(`${__dirname} : createdDate 값이 존재하지 않습니다.`);
        this.createdDate = createdDate;
    }

    private setProfile(profile: string | null) {
        this.profile = profile;  // Profile can be null, so no exception is thrown
    }

    private setMyAgoraSign(myAgoraSign: string) {
        if (!myAgoraSign) throw new InternalServerErrorException(`${__dirname} : myAgoraSign 값이 존재하지 않습니다.`);
        this.myAgoraSign = myAgoraSign;
    }
}
