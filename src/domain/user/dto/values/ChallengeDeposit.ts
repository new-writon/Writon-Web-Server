import { InternalServerErrorException } from '@nestjs/common';

export class ChallengeDeposit {
  private userChallengeId: number;
  private calculatedDeposit: number;

  constructor(userChallengeId: number, calculatedDeposit: number) {
    this.setUserChallengeId(userChallengeId);
    this.setCalculatedDeposit(calculatedDeposit);
  }

  public static of(userChallengeId: number, calculatedDeposit: number) {
    return new ChallengeDeposit(userChallengeId, calculatedDeposit);
  }

  private setUserChallengeId(userChallengeId: number) {
    if (userChallengeId === null)
      throw new InternalServerErrorException(
        `${__dirname} : userChallengeId값이 존재하지 않습니다.`,
      );
    this.userChallengeId = userChallengeId;
  }

  private setCalculatedDeposit(calculatedDeposit: number) {
    if (calculatedDeposit === null)
      throw new InternalServerErrorException(
        `${__dirname} : calculatedDeposit 값이 존재하지 않습니다.`,
      );
    this.calculatedDeposit = calculatedDeposit;
  }

  public getUserChallengeId() {
    return this.userChallengeId;
  }

  public getCalculatedDeposit() {
    return this.calculatedDeposit;
  }
}
