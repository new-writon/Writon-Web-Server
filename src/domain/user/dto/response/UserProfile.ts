import { InternalServerErrorException } from '@nestjs/common';

export class UserProfile {
  private nickname: string;
  private email: string;
  private userProfile: string | null;
  private accountNumber: string | null;
  private bank: string | null;
  private hiredate: Date;
  private company: string;
  private position: string;
  private positionIntroduce: string;

  constructor(
    nickname: string,
    email: string,
    userProfile: string | null,
    accountNumber: string | null,
    bank: string | null,
    hiredate: Date,
    company: string,
    position: string,
    positionIntroduce: string,
  ) {
    this.setNickname(nickname);
    this.setEmail(email);
    this.setUserProfile(userProfile);
    this.setAccountNumber(accountNumber);
    this.setBank(bank);
    this.setHiredate(hiredate);
    this.setCompany(company);
    this.setPosition(position);
    this.setPositionIntroduce(positionIntroduce);
  }

  public static of(userProfile: UserProfile) {
    return new UserProfile(
      userProfile.nickname,
      userProfile.email,
      userProfile.userProfile,
      userProfile.accountNumber,
      userProfile.bank,
      userProfile.hiredate,
      userProfile.company,
      userProfile.position,
      userProfile.positionIntroduce,
    );
  }

  private setNickname(nickname: string): void {
    if (nickname === null)
      throw new InternalServerErrorException(
        `${__dirname} :nickname값이 존재하지 않습니다.`,
      );
    this.nickname = nickname;
  }

  private setEmail(email: string): void {
    if (email === null)
      throw new InternalServerErrorException(
        `${__dirname} : email값이 존재하지 않습니다.`,
      );
    this.email = email;
  }

  private setUserProfile(userProfile: string | null): void {
    this.userProfile = userProfile;
  }

  private setAccountNumber(accountNumber: string | null): void {
    this.accountNumber = accountNumber;
  }

  private setBank(bank: string | null): void {
    this.bank = bank;
  }

  private setHiredate(hiredate: Date): void {
    if (hiredate === null)
      throw new InternalServerErrorException(
        `${__dirname} : hiredate값이 존재하지 않습니다.`,
      );
    this.hiredate = hiredate;
  }

  private setCompany(company: string): void {
    if (company === null)
      throw new InternalServerErrorException(
        `${__dirname} : company값이 존재하지 않습니다.`,
      );
    this.company = company;
  }

  private setPosition(position: string): void {
    if (position === null)
      throw new InternalServerErrorException(
        `${__dirname} : position 값이 존재하지 않습니다.`,
      );
    this.position = position;
  }

  private setPositionIntroduce(positionIntroduce: string): void {
    if (positionIntroduce === null)
      throw new InternalServerErrorException(
        `${__dirname} : positionIntroduce 값이 존재하지 않습니다.`,
      );
    this.positionIntroduce = positionIntroduce;
  }
}
