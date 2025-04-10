import { InternalServerErrorException } from '@nestjs/common';

export class BasicQuestion {
  private questionId: number;
  private question: string;

  constructor(questionId: number, question: string) {
    this.setQuestionId(questionId);
    this.setQuestion(question);
  }

  public static of(specialQuestion: BasicQuestion[]): BasicQuestion[] {
    return specialQuestion.map((sq) => {
      return new BasicQuestion(sq.questionId, sq.question);
    });
  }

  private setQuestionId(questionId: number) {
    if (questionId === null)
      throw new InternalServerErrorException(`${__dirname} : questionId값이 존재하지 않습니다.`);
    this.questionId = questionId;
  }

  private setQuestion(question: string) {
    if (question === null)
      throw new InternalServerErrorException(`${__dirname} : question값이 존재하지 않습니다.`);
    this.question = question;
  }
}
