import { Injectable } from '@nestjs/common';
import { CommentDelete } from '../../../dto/request/CommentDelete';
import { TemplateOperation } from '../types/Operation';
import { CommentHelper } from 'src/domain/template/application/helper/Comment.Helper';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';

@Injectable()
export class CommentEraser implements TemplateUseCase<[CommentDelete, number], Promise<void>> {
  operation: TemplateOperation = 'DELETE_COMMENT';
  constructor(
    private readonly userApi: UserApi,
    private readonly commentHelper: CommentHelper,
  ) {}

  async handle(request: [CommentDelete, number]): Promise<void> {
    const [commentDelete, userId] = request;
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
