import { Injectable } from '@nestjs/common';
import { LikeClick } from '../../../dto/request/LikeClick';
import { LikeCount } from '../../../dto/response/LikeCount';
import { TemplateOperation } from '../types/Operation';
import { LikeHelper } from 'src/domain/template/application/helper/Like.Helper';
import { UserApi } from 'src/domain/template/application/apis/User.Api';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';

@Injectable()
export class LikeEraser implements TemplateUseCase<[LikeClick, number], Promise<LikeCount>> {
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
