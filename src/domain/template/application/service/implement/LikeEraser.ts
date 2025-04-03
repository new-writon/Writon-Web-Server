import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../../port/input/TemplateHandler';
import { LikeClick } from '../../../dto/request/LikeClick';
import { LikeCount } from '../../../dto/response/LikeCount';
import { TemplateOperation } from '../types/Operation';
import { LikeHelper } from 'src/domain/template/infrastructure/adapter/input/helper/Like.Helper';
import { UserApi } from 'src/domain/template/infrastructure/adapter/output/apis/User.Api';

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
