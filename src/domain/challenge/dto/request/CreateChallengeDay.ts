import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChallengeDay {
  @IsNotEmpty()
  @IsString()
  day: string;

  @IsNotEmpty()
  @IsNumber()
  challengeId: number;

  static of(data: { day: string; challengeId: number }): CreateChallengeDay {
    const challengeDay = new CreateChallengeDay();
    challengeDay.day = data.day;
    challengeDay.challengeId = data.challengeId;
    return challengeDay;
  }
}
