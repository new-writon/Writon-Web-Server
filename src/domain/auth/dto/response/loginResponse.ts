import { InternalServerErrorException } from '@nestjs/common';

export class LoginResponse {
  private accessToken: string;
  private refreshToken: string;
  private role: string;
  private affiliatedConfirmation: boolean | null;
  private challengedConfirmation: boolean | null;

  constructor(
    accessToken: string,
    refreshToken: string,
    role: string,
    affiliatedConfirmation: boolean | null,
    challengedConfirmation: boolean | null,
  ) {
    this.setAccessToken(accessToken),
      this.setRefreshToken(refreshToken),
      this.setRole(role),
      this.setAffiliatedConfirmation(affiliatedConfirmation),
      this.setChallengedConfirmation(challengedConfirmation);
  }

  public static of(
    accessToken: string,
    refreshToken: string,
    role: string,
    affiliatedConfirmation: boolean | null,
    challengedConfirmation: boolean | null,
  ): LoginResponse {
    return new LoginResponse(
      accessToken,
      refreshToken,
      role,
      affiliatedConfirmation,
      challengedConfirmation,
    );
  }

  private setAccessToken(accessToken: string): void {
    if (accessToken === null)
      throw new InternalServerErrorException(
        `${__dirname} : AccessToken 값이 존재하지 않습니다.`,
      );
    this.accessToken = accessToken;
  }

  private setRefreshToken(refreshToken: string): void {
    if (refreshToken === null)
      throw new InternalServerErrorException(
        `${__dirname} : RefreshToken 값이 존재하지 않습니다.`,
      );
    this.refreshToken = refreshToken;
  }

  private setRole(role: string): void {
    if (role === null)
      throw new InternalServerErrorException(
        `${__dirname} : Role 값이 존재하지 않습니다.`,
      );
    this.role = role;
  }

  private setAffiliatedConfirmation(affiliatedConfirmation: boolean): void {
    this.affiliatedConfirmation = affiliatedConfirmation;
  }

  private setChallengedConfirmation(challengedConfirmation: boolean): void {
    this.challengedConfirmation = challengedConfirmation;
  }
}
