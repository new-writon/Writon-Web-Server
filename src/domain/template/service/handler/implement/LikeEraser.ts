import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { LikeClick } from '../../../dto/request/LikeClick';
import { LikeCount } from '../../../dto/response/LikeCount';
import { TemplateOperation } from '../../types/Operation';
import { UserApi } from '../../../infrastructure/User.Api';
import { LikeHelper } from '../../../helper/Like.Helper';

@Injectable()
export class LikeEraser implements TemplateHandler<[LikeClick, number], Promise<LikeCount>> {
  operation: TemplateOperation = 'PUT_LIKE';

  constructor(
    private readonly userApi: UserApi,
    private readonly likeHelper: LikeHelper,
  ) {}
  async handle(request: [LikeClick, number]): Promise<LikeCount> {
    const [lickClick, userId] = request;
    const affiliationData = await this.userApi.requestAffiliationByUserIdAndOrganization(
      userId,
      lickClick.getOrganization(),
    );
    await this.likeHelper.executeDeleteLike(
      affiliationData.getAffiliationId(),
      lickClick.getUserTemplateId(),
    );
    const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(
      lickClick.getUserTemplateId(),
    );
    return LikeCount.of(likeCount);
  }
}
