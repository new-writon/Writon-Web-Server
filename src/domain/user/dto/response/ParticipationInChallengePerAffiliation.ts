import { InternalServerErrorException } from '@nestjs/common';

export class ParticipationInChallengePerAffiliation {
  private affiliatedConfirmation: boolean;
  private challengedConfirmation: boolean;

  constructor(
    affiliatedConfirmation: boolean,
    challengedConfirmation: boolean,
  ) {
    this.setAffiliatedConfirmation(affiliatedConfirmation);
    this.setChallengedConfirmation(challengedConfirmation);
  }

  public static of(
    affiliatedConfirmation: boolean,
    challengedConfirmation: boolean,
  ) {
    return new ParticipationInChallengePerAffiliation(
      affiliatedConfirmation,
      challengedConfirmation,
    );
  }

  setAffiliatedConfirmation(affiliatedConfirmation: boolean) {
    if (affiliatedConfirmation === null)
      throw new InternalServerErrorException(
        `${__dirname} : affiliatedConfirmation 값이 존재하지 않습니다.`,
      );
    this.affiliatedConfirmation = affiliatedConfirmation;
  }

  setChallengedConfirmation(challengedConfirmation: boolean) {
    if (challengedConfirmation === null)
      throw new InternalServerErrorException(
        `${__dirname} : challengedConfirmation 값이 존재하지 않습니다.`,
      );
    this.challengedConfirmation = challengedConfirmation;
  }
}
