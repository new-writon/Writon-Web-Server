import { IsNotEmpty } from 'class-validator';

export class ChallengeStart {
  @IsNotEmpty()
  private organization: string;

  @IsNotEmpty()
  private challengeId: number;

  getOrganization() {
    return this.organization;
  }

  getChallengeId() {
    return this.challengeId;
  }
}
