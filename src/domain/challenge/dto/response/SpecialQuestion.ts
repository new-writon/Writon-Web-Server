import { InternalServerErrorException } from '@nestjs/common';

export class SpecialQuestion {
  private questionId: number;
  private question: string;
  private keyword: string;

  constructor(questionId: number, question: string, keyword: string) {
    this.setQuestionId(questionId);
    this.setQuestion(question);
    this.setKeyword(keyword);
  }

  public static of(specialQuestion: SpecialQuestion[]): SpecialQuestion[] {
    return specialQuestion.map((sq) => {
      return new SpecialQuestion(sq.questionId, sq.question, sq.keyword);
    });
  }

  private setQuestionId(questionId: number) {
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

  private setKeyword(keyword: string) {
    if (keyword === null) {
      throw new InternalServerErrorException(`${__dirname} : keyword값이 존재하지 않습니다.`);
    }
    this.keyword = keyword;
  }
}
