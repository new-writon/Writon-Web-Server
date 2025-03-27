import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { CommentCheck } from '../../dto/request/CommentCheck';
import { CommentHelper } from '../../helper/Comment.Helper';
import { TemplateOperation } from '../types/comment';

@Injectable()
export class CommentChecker implements TemplateHandler<CommentCheck, void> {
  constructor(private readonly commentHelper: CommentHelper) {}
  operation: TemplateOperation = 'CHECK_COMMENT';
  async handle(commentCheck: CommentCheck) {
    await this.commentHelper.executeUpdateCommentCheck(commentCheck.getCommentId());
  }
}
