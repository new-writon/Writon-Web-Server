import { Injectable } from '@nestjs/common';
import { ChallengeHelper } from 'src/domain/challenge/application/helper/Challenge.Helper';
import { ChallengeDayHelper } from 'src/domain/challenge/application/helper/ChallengeDay.Helper';
import { QuestionHelper } from 'src/domain/challenge/application/helper/Question.Helper';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';
import { ChallengeDay } from 'src/domain/challenge/domain/entity/ChallengeDay';
import { Question } from 'src/domain/challenge/domain/entity/Question';

@Injectable()
export class ChallengeApi {
  constructor(
    private readonly challengeDayHelper: ChallengeDayHelper,
    private readonly questionHelper: QuestionHelper,
    private readonly challengeHelper: ChallengeHelper,
  ) {}

  public async requestChallengeDayByChallengeIdAndDate(
    challengeId: number,
    date: string,
  ): Promise<ChallengeDay> {
    return this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(challengeId, date);
  }

  public async requestQuestionById(questionId: number[]): Promise<Question[]> {
    return this.questionHelper.giveQuestionById(questionId);
  }

  public async requestQuestionsByChallengeId(challengeId: number): Promise<Question[]> {
    return this.questionHelper.giveQuestionsByChallengeId(challengeId);
  }

  public async requestChallengeById(challengeId: number): Promise<Challenge> {
    return this.challengeHelper.giveChallengeById(challengeId);
  }
}
