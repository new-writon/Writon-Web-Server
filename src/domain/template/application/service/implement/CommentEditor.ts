import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { CommentUpdate } from '../../../dto/request/CommentUpdate';
import { TemplateOperation } from '../types/Operation';
import { CommentHelper } from 'src/domain/template/infrastructure/adapter/input/helper/Comment.Helper';
import { UserApi } from 'src/domain/template/infrastructure/adapter/output/apis/User.Api';

@Injectable()
export class CommentEditor implements TemplateHandler<[CommentUpdate, number], void> {
  operation: TemplateOperation = 'UPDATE_COMMENT';
  constructor(
    private readonly userApi: UserApi,
    private readonly commentHelper: CommentHelper,
  ) {}

  async handle(request: [CommentUpdate, number]) {
    const [commentUpdate, userId] = request;
    const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(
      userId,
      commentUpdate.getOrganization(),
    );
    console.log(affiliationData);
    await this.commentHelper.executeUpdateComment(
      affiliationData.getAffiliationId(),
      commentUpdate.getCommentId(),
      commentUpdate.getContent(),
    );
  }
}
