import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SmallTalkDataResult {
    private smallTalkId: number;
    private question: string;
    private participateCount: number;
    private nickname: string;
    private createdTime: Date;
    private createdDate: Date;
    private profile: string | null;
    private mySmallTalkSign: string;

    constructor(
        smallTalkId: number,
        question: string,
        participateCount: number,
        nickname: string,
        createdTime: Date,
        createdDate: Date,
        profile: string | null,
        mySmallTalkSign: string
    ) {
        this.setSmallTalkId(smallTalkId);
        this.setQuestion(question);
        this.setParticipateCount(participateCount);
        this.setNickname(nickname);
        this.setCreatedTime(createdTime);
        this.setCreatedDate(createdDate);
        this.setProfile(profile);
        this.setMySmallTalkSign(mySmallTalkSign);
    }

    public static of(
        smallTalkDataResult:SmallTalkDataResult[]
    ) {
        return smallTalkDataResult.map((data) => new SmallTalkDataResult(data.smallTalkId, data.question, data.participateCount, data.nickname, data.createdTime, data.createdDate, data.profile, data.mySmallTalkSign))
    }

    private setSmallTalkId(smallTalkId: number) {
        if (smallTalkId=== null || smallTalkId === undefined) throw new InternalServerErrorException(`${__dirname} : smallTalkId 값이 존재하지 않습니다.`);
        this.smallTalkId=smallTalkId;
    }

    private setQuestion(question: string) {
        if (question===null) throw new InternalServerErrorException(`${__dirname} : question 값이 존재하지 않습니다.`);
        this.question = question;
    }

    private setParticipateCount(participateCount: number) {
        if (participateCount===null) throw new InternalServerErrorException(`${__dirname} : participateCount 값이 존재하지 않습니다.`);
        this.participateCount = participateCount;
    }

    private setNickname(nickname: string) {
        if (nickname===null) throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
        this.nickname = nickname;
    }

    private setCreatedTime(createdTime: Date) {
        if (createdTime===null) throw new InternalServerErrorException(`${__dirname} : createdTime 값이 존재하지 않습니다.`);
        this.createdTime = createdTime;
    }

    private setCreatedDate(createdDate: Date) {
        if (createdDate===null) throw new InternalServerErrorException(`${__dirname} : createdDate 값이 존재하지 않습니다.`);
        this.createdDate = createdDate;
    }

    private setProfile(profile: string | null) {
        this.profile = profile;  // Profile can be null, so no exception is thrown
    }

    private setMySmallTalkSign(mySmallTalkSign: string) {
        if (mySmallTalkSign===null) throw new InternalServerErrorException(`${__dirname} : mySmallTalkSign값이 존재하지 않습니다.`);
        this.mySmallTalkSign = mySmallTalkSign;
    }
}