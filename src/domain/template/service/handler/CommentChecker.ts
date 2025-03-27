import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { CommentCheck } from '../../dto/request/CommentCheck';
import { CommentHelper } from '../../helper/Comment.Helper';
import { TemplateOperation } from '../types/Operation';

@Injectable()
export class CommentChecker implements TemplateHandler<CommentCheck, void> {
  constructor(private readonly commentHelper: CommentHelper) {}
  operation: TemplateOperation = 'CHECK_COMMENT';
  async handle(request: CommentCheck) {
    // const [commentCheck] = request;
    console.log(request);
    await this.commentHelper.executeUpdateCommentCheck(commentCheck.getCommentId());
  }
}
