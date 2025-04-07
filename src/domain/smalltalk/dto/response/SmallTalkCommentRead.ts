import { InternalServerErrorException } from '@nestjs/common';
import { ParticularSmallTalkCommentData } from '../values/ParticularSmallTalkCommentData';

export class SmallTalkCommentRead {
  private smallTalkCommentId: number;
  private content: string;
  private nickname: string;
  private profile: string;
  private createdTime: string;
  private myCommentSign: string;

  constructor(
    smallTalkCommentId: number,
    content: string,
    nickname: string,
    profile: string,
    createdTime: string,
    myCommentSign: string,
  ) {
    this.setSmallTalkCommentId(smallTalkCommentId);
    this.setContent(content);
    this.setNickname(nickname);
    this.setProfile(profile);
    this.setCreatedTime(createdTime);
    this.setMyCommentSign(myCommentSign);
  }

  public static of(
    particularSmallTalkCommentData: ParticularSmallTalkCommentData,
    nickname: string,
    profile: string,
    myCommentSign: string,
  ) {
    return new SmallTalkCommentRead(
      particularSmallTalkCommentData.getSmallTalkCommentId(),
      particularSmallTalkCommentData.getContent(),
      nickname,
      profile,
      particularSmallTalkCommentData.getCreatedTime(),
      myCommentSign,
    );
  }

  private setSmallTalkCommentId(smallTalkCommentId: number) {
    if (smallTalkCommentId === undefined || smallTalkCommentId === null) {
      throw new InternalServerErrorException(
        `${__dirname} : smallTalkCommentId 값이 존재하지 않습니다.`,
      );
    }
    this.smallTalkCommentId = smallTalkCommentId;
  }

  private setContent(content: string) {
    if (!content) {
      throw new InternalServerErrorException(`${__dirname} : content 값이 존재하지 않습니다.`);
    }
    this.content = content;
  }

  private setNickname(nickname: string) {
    if (!nickname) {
      throw new InternalServerErrorException(`${__dirname} : nickname 값이 존재하지 않습니다.`);
    }
    this.nickname = nickname;
  }

  private setProfile(profile: string) {
    this.profile = profile;
  }

  private setCreatedTime(createdTime: string) {
    if (!createdTime) {
      throw new InternalServerErrorException(`${__dirname} : createdTime 값이 존재하지 않습니다.`);
    }
    this.createdTime = createdTime;
  }

  private setMyCommentSign(myCommentSign: string) {
    if (!myCommentSign) {
      throw new InternalServerErrorException(
        `${__dirname} : myCommentSign 값이 존재하지 않습니다.`,
      );
    }
    this.myCommentSign = myCommentSign;
  }
}
