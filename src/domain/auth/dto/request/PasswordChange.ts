import { IsNotEmpty, MaxLength } from 'class-validator';

export class PasswordChange {
  @IsNotEmpty()
  @MaxLength(20)
  private oldPassword: string;

  @IsNotEmpty()
  @MaxLength(20)
  private newPassword: string;

  public getOldPassword() {
    return this.oldPassword;
  }

  public getNewPassword() {
    return this.newPassword;
  }
}
