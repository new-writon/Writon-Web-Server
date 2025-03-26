import { Injectable } from '@nestjs/common';
import { CommentHandler } from './CommentHandler';
import { CommentUpdate } from '../../dto/request/CommentUpdate';
import { User } from 'src/domain/user/domain/entity/User';
import { UserApi } from '../../infrastructure/User.Api';
import { CommentHelper } from '../../helper/Comment.Helper';

@Injectable()
export class EditorHandler implements CommentHandler<[CommentUpdate, number], void> {
  operation = 'UPDATE_COMMENT';
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
