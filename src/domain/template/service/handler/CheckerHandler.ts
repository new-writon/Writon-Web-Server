import { Injectable } from '@nestjs/common';
import { CommentHandler } from './CommentHandler';
import { CommentCheck } from '../../dto/request/CommentCheck';
import { CommentHelper } from '../../helper/Comment.Helper';

@Injectable()
export class CommentChecker implements CommentHandler<CommentCheck, void> {
  constructor(private readonly commentHelper: CommentHelper) {}
  operation = 'COMMENT_CHECK';
  async handle(commentCheck: CommentCheck) {
    await this.commentHelper.executeUpdateCommentCheck(commentCheck.getCommentId());
  }
}
