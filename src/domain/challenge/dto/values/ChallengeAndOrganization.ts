import { InternalServerErrorException } from '@nestjs/common';

export class ChallengeAndOrganization {
  private organizations: string;
  private challenges: string;

  constructor(organizations: string, challenges: string) {
    this.setOrganization(organizations);
    this.setChallenge(challenges);
  }

  public static of(
    challengeAndOrganizationArrayData: ChallengeAndOrganization[],
  ) {
    return challengeAndOrganizationArrayData.map((data) => {
      return new ChallengeAndOrganization(data.organizations, data.challenges);
    });
  }

  public getOrganization() {
    return this.organizations;
  }

  public getChallenge() {
    return this.challenges;
  }

  private setOrganization(organization: string) {
    if (organization === null)
      throw new InternalServerErrorException(
        `${__dirname} : organization 값이 존재하지 않습니다.`,
      );
    this.organizations = organization;
  }

  private setChallenge(challenge: string) {
    if (challenge === null)
      throw new InternalServerErrorException(
        `${__dirname} : challenge 값이 존재하지 않습니다.`,
      );
    this.challenges = challenge;
  }
}
