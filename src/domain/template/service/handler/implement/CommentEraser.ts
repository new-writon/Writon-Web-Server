import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { CommentDelete } from '../../../dto/request/CommentDelete';
import { UserApi } from '../../../infrastructure/User.Api';
import { CommentHelper } from '../../../helper/Comment.Helper';
import { TemplateOperation } from '../../types/Operation';

@Injectable()
export class CommentEraser implements TemplateHandler<[CommentDelete, number], Promise<void>> {
  operation: TemplateOperation = 'DELETE_COMMENT';
  constructor(
    private readonly userApi: UserApi,
    private readonly commentHelper: CommentHelper,
  ) {}

  async handle(request: [CommentDelete, number]): Promise<void> {
    const [commentDelete, userId] = request;
    console.log(commentDelete);
    const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(
      userId,
      commentDelete.getOrganization(),
    );
    await this.commentHelper.executeDeleteComment(
      affiliationData.getAffiliationId(),
      commentDelete.getCommentId(),
    );
  }
}
