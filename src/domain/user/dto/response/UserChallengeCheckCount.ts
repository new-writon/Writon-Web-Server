export class UserChallengeCheckCount {
  private checkCount: number | null;

  constructor(checkCount: number | null) {
    this.setCheckCount(checkCount);
  }

  public static of(checkCount: number | null) {
    return new UserChallengeCheckCount(checkCount);
  }

  private setCheckCount(checkCount: number | null) {
    this.checkCount = checkCount;
  }
}
