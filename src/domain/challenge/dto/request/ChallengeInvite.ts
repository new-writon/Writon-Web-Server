import { IsNotEmpty } from 'class-validator';

export class ChallengeInvite {
  @IsNotEmpty()
  private organization: string;

  @IsNotEmpty()
  private challenge: string;

  @IsNotEmpty()
  private email: string[];

  getOrganization() {
    return this.organization;
  }

  getChallenge() {
    return this.challenge;
  }

  getEmail() {
    return this.email;
  }
}
