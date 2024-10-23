import { InternalServerErrorException } from '@nestjs/common';

export class SatisfactionStatus {
  private review: number;

  constructor(review: number) {
    this.setReview(review);
  }

  public static of(review: number) {
    return new SatisfactionStatus(review);
  }

  private setReview(review: number) {
    if (review === null)
      throw new InternalServerErrorException(
        `${__dirname} : review값이 존재하지 않습니다.`,
      );
    this.review = review;
  }
}
