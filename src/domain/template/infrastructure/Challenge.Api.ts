import { Injectable } from '@nestjs/common';
import { ChallengeDayHelper } from '../../challenge/helper/ChallengeDay.Helper';
import { ChallengeDay } from '../../challenge/domain/entity/ChallengeDay';
import { Question } from '../../challenge/domain/entity/Question';
import { QuestionHelper } from '../../challenge/helper/Question.Helper';
import { ChallengeHelper } from 'src/domain/challenge/helper/Challenge.Helper';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';

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
    return this.challengeDayHelper.giveChallengeDayByChallengeIdAndDate(
      challengeId,
      date,
    );
  }

  public async requestQuestionById(questionId: number[]): Promise<Question[]> {
    return this.questionHelper.giveQuestionById(questionId);
  }

  public async requestQuestionsByChallengeId(
    challengeId: number,
  ): Promise<Question[]> {
    return this.questionHelper.giveQuestionsByChallengeId(challengeId);
  }

  public async requestChallengeById(challengeId: number): Promise<Challenge> {
    return this.challengeHelper.giveChallengeById(challengeId);
  }
}
