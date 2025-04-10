import { Injectable } from '@nestjs/common';
import { CommentCheck } from '../../../dto/request/CommentCheck';
import { TemplateOperation } from '../types/Operation';
import { CommentHelper } from 'src/domain/template/application/helper/Comment.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';

@Injectable()
export class CommentChecker implements TemplateUseCase<[CommentCheck], Promise<void>> {
  constructor(private readonly commentHelper: CommentHelper) {}
  operation: TemplateOperation = 'CHECK_COMMENT';
  async handle(request: [CommentCheck]) {
    const [commentCheck] = request;
    await this.commentHelper.executeUpdateCommentCheck(commentCheck.getCommentId());
  }
}
