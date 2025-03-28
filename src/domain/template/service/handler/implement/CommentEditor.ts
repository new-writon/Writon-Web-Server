import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { CommentUpdate } from '../../../dto/request/CommentUpdate';
import { User } from 'src/domain/user/domain/entity/User';
import { UserApi } from '../../../infrastructure/User.Api';
import { CommentHelper } from '../../../helper/Comment.Helper';
import { TemplateOperation } from '../../types/Operation';

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
