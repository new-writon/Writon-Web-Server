import { Injectable } from '@nestjs/common';
import { TemplateUseCase } from '../TemplateUseCase';
import { CommentCheck } from '../../../dto/request/CommentCheck';
import { TemplateOperation } from '../types/Operation';
import { CommentHelper } from 'src/domain/template/infrastructure/adapter/input/helper/Comment.Helper';

@Injectable()
export class CommentChecker implements TemplateUseCase<[CommentCheck], Promise<void>> {
  constructor(private readonly commentHelper: CommentHelper) {}
  operation: TemplateOperation = 'CHECK_COMMENT';
  async handle(request: [CommentCheck]) {
    const [commentCheck] = request;
    await this.commentHelper.executeUpdateCommentCheck(commentCheck.getCommentId());
  }
}
