import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

export class CreateChallenge {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  startAt: Date;

  @IsNotEmpty()
  @IsDate()
  finishAt: Date;

  @IsNotEmpty()
  @IsNumber()
  organizationId: number;

  @IsNotEmpty()
  @IsNumber()
  deposit: number;

  @IsEnum(ChallengeStatusEnum)
  status: ChallengeStatusEnum;

  static of(data: {
    name: string;
    startAt: Date;
    endAt: Date;
    organizationId: number;
    deposit: number;
    status?: ChallengeStatusEnum;
  }): CreateChallenge {
    const challenge = new CreateChallenge();
    challenge.name = data.name;
    challenge.startAt = data.startAt;
    challenge.finishAt = data.endAt;
    challenge.organizationId = data.organizationId;
    challenge.deposit = data.deposit;
    challenge.status = data.status;
    return challenge;
  }
}
