import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ChallengeDayRepository } from '../../port/output/ChallengeDay.Repository';
import { ChallengeDay } from 'src/domain/challenge/domain/entity/ChallengeDay';
import { CreateChallengeDay } from 'src/domain/challenge/dto/request/CreateChallengeDay';

@Injectable()
export class ChallengeDayRegistrant {
  constructor(
    @Inject('challengedayImpl')
    private readonly challengeDayRepository: ChallengeDayRepository,
  ) {}

  async handle(dtos: CreateChallengeDay[]) {
    const entities = dtos.map((dto) => plainToInstance(ChallengeDay, dto));
    const challegeDays = this.challengeDayRepository.create(entities);
    await this.challengeDayRepository.save(challegeDays);
  }
}
