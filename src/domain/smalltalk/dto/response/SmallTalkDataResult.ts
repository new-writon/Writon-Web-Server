import { InternalServerErrorException } from '@nestjs/common';
import { ParticularSmallTalkData } from '../values/ParticularSmallTalkData';

export class SmallTalkDataResult {
  private smallTalkId: number;
  private question: string;
  private participateCount: number;
  private createdTime: Date;
  private createdDate: Date;
  private nickname: string;
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
    mySmallTalkSign: string,
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
    particularSmallTalkData: ParticularSmallTalkData,
    nickname: string,
    profile: string,
    mySmallTalkSign: string,
  ) {
    return new SmallTalkDataResult(
      particularSmallTalkData.getSmallTalkId(),
      particularSmallTalkData.getQuestion(),
      particularSmallTalkData.getParticipateCount(),
      nickname,
      particularSmallTalkData.getCreatedTime(),
      particularSmallTalkData.getCreatedDate(),
      profile,
      mySmallTalkSign,
    );
  }

  private setSmallTalkId(smallTalkId: number) {
    if (smallTalkId === null || smallTalkId === undefined)
      throw new InternalServerErrorException(`${__dirname} : smallTalkId 값이 존재하지 않습니다.`);
    this.smallTalkId = smallTalkId;
  }

  private setQuestion(question: string) {
    if (question === null)
      throw new InternalServerErrorException(`${__dirname} : question 값이 존재하지 않습니다.`);
    this.question = question;
  }

  private setParticipateCount(participateCount: number) {
    if (participateCount === null)
      throw new InternalServerErrorException(
        `${__dirname} : participateCount 값이 존재하지 않습니다.`,
      );
    this.participateCount = participateCount;
  }

  private setNickname(nickname: string) {
    if (nickname === null)
      throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
    this.nickname = nickname;
  }

  private setCreatedTime(createdTime: Date) {
    if (createdTime === null)
      throw new InternalServerErrorException(`${__dirname} : createdTime 값이 존재하지 않습니다.`);
    this.createdTime = createdTime;
  }

  private setCreatedDate(createdDate: Date) {
    if (createdDate === null)
      throw new InternalServerErrorException(`${__dirname} : createdDate 값이 존재하지 않습니다.`);
    this.createdDate = createdDate;
  }

  private setProfile(profile: string | null) {
    this.profile = profile; // Profile can be null, so no exception is thrown
  }

  private setMySmallTalkSign(mySmallTalkSign: string) {
    if (mySmallTalkSign === null)
      throw new InternalServerErrorException(
        `${__dirname} : mySmallTalkSign값이 존재하지 않습니다.`,
      );
    this.mySmallTalkSign = mySmallTalkSign;
  }
}
