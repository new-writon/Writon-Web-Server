import { Inject, Injectable } from '@nestjs/common';
import { CreateChallenge } from 'src/domain/challenge/dto/request/CreateChallenge';
import { ChallengeRepository } from '../../port/output/Challenge.Repository';
import { plainToInstance } from 'class-transformer';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';

@Injectable()
export class ChallengeRegistrant {
  constructor(
    @Inject('challengeImpl')
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  async handle(dto: CreateChallenge) {
    const entity = plainToInstance(Challenge, dto);
    const challege = this.challengeRepository.create(entity);
    return this.challengeRepository.save(challege);
  }
}
