import { IsNotEmpty } from 'class-validator';

export class UserChallengeCheckCountUpdate {
  @IsNotEmpty()
  private checkCount: number;

  public getCheckCount() {
    return this.checkCount;
  }
}
