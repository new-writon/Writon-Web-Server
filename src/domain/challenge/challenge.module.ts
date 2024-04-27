import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './domain/entity/Challenge.js';
import { ChallengeDay } from './domain/entity/ChallengeDay.js';
import { ChallengeDepositDeduction } from './domain/entity/ChallengeDepositDeduction.js';
import { Question } from './domain/entity/Question.js';
import { QuestionTag } from './domain/entity/QuestionTag.js';



@Module({
  imports: [

    TypeOrmModule.forFeature([Challenge, ChallengeDay, ChallengeDepositDeduction, Question, QuestionTag]),

  
  ],
  providers: [
  
  ],
  controllers: [],
})
export class ChallengeModule {}
