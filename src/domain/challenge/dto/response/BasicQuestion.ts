import { InternalServerErrorException } from '@nestjs/common';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

export class BasicQuestion {
  private questionId: number | string;
  private question: string;
  private content?: string;
  private _id?: string;
  private status: ChallengeStatusEnum;

  constructor(questionId: number | string, question: string) {
    this.setQuestionId(questionId);
    this.setQuestion(question);
  }

  public static of(specialQuestion: BasicQuestion[], status: ChallengeStatusEnum): BasicQuestion[] {
    return specialQuestion.map((sq) => {
      return status === ChallengeStatusEnum.WRITON
        ? new BasicQuestion(sq._id, sq.content)
        : new BasicQuestion(sq.questionId, sq.question);
    });
  }

  private setQuestionId(questionId: number | string) {
    if (questionId === null) {
      throw new InternalServerErrorException(`${__dirname} : questionId값이 존재하지 않습니다.`);
    }
    this.questionId = questionId;
  }

  private setQuestion(question: string) {
    if (question === null) {
      throw new InternalServerErrorException(`${__dirname} : question값이 존재하지 않습니다.`);
    }
    this.question = question;
  }
}
