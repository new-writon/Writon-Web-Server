import { InternalServerErrorException } from '@nestjs/common';
import { ChallengeStatusEnum } from 'src/global/enum/ChallengeStatus';

export class SpecialQuestion {
  private questionId: number | string;
  private question: string;
  private keyword: string;
  private content?: string;
  private _id?: string;
  private status: ChallengeStatusEnum;

  constructor(questionId: number | string, question: string, keyword: string) {
    this.setQuestionId(questionId);
    this.setQuestion(question);
    this.setKeyword(keyword);
  }

  public static of(
    specialQuestion: SpecialQuestion[],
    status: ChallengeStatusEnum,
  ): SpecialQuestion[] {
    return specialQuestion.map((sq) => {
      return status === ChallengeStatusEnum.WRITON
        ? new SpecialQuestion(sq._id, sq.content, sq.keyword)
        : new SpecialQuestion(sq.questionId, sq.question, sq.keyword);
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

  private setKeyword(keyword: string) {
    if (keyword === null) {
      throw new InternalServerErrorException(`${__dirname} : keyword값이 존재하지 않습니다.`);
    }
    this.keyword = keyword;
  }
}
