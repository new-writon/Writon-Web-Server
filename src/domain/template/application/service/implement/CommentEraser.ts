import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { CommentDelete } from '../../../dto/request/CommentDelete';
import { TemplateOperation } from '../types/Operation';
import { CommentHelper } from 'src/domain/template/infrastructure/adapter/input/helper/Comment.Helper';
import { UserApi } from 'src/domain/template/infrastructure/adapter/output/apis/User.Api';

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
