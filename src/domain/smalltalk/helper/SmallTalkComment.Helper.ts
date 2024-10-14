import { Inject, Injectable } from '@nestjs/common';
import { SmallTalkCommentRepository } from '../domain/repository/SmallTalkComment.Repository';
import { ParticularSmallTalkCommentData } from '../dto/values/ParticularSmallTalkCommentData';

@Injectable()
export class SmallTalkCommentHelper {
  constructor(
    @Inject('smallTalkCommentImpl')
    private readonly smallTalkCommentRepository: SmallTalkCommentRepository,
  ) {}

  public async executeInsertSmallTalkComment(
    smallTalkId: number,
    affiliationId: number,
    smallTalkComment: string,
  ): Promise<void> {
    return this.smallTalkCommentRepository.insertSmallTalkComment(
      smallTalkId,
      affiliationId,
      smallTalkComment,
    );
  }

  public async giveSmallTalkCommentBySmallTalkId(
    smallTalkId: number,
  ): Promise<ParticularSmallTalkCommentData[]> {
    return this.smallTalkCommentRepository.findSmallTalkCommentBySmallTalkId(
      smallTalkId,
    );
  }
}
