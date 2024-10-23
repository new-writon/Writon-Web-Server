import { Participant } from './Participant.js';

export class ParticipantComponent {
  private challengeOverlapPeriod: number;
  private challengeParticipantCount: number;
  private participantData: Participant[];

  constructor(
    challengeOverlapPeriod: number,
    challengeParticipantCount: number,
    participantData: Participant[],
  ) {
    this.setChallengeOverlapPeriod(challengeOverlapPeriod);
    this.setChallengeParticipantCount(challengeParticipantCount);
    this.setParticipantData(participantData);
  }

  public static of(
    challengeOverlapPeriod: number,
    challengeParticipantCount: number,
    participantData: Participant[],
  ) {
    return new ParticipantComponent(
      challengeOverlapPeriod,
      challengeParticipantCount,
      participantData,
    );
  }

  private setChallengeOverlapPeriod(challengeOverlapPeriod: number) {
    this.challengeOverlapPeriod = challengeOverlapPeriod;
  }

  private setChallengeParticipantCount(challengeParticipantCount: number) {
    this.challengeParticipantCount = challengeParticipantCount;
  }

  private setParticipantData(participantData: Participant[]) {
    this.participantData = participantData;
  }
}
