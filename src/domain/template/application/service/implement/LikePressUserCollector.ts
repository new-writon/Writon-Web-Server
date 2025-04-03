import { Injectable } from '@nestjs/common';
import { TemplateUseCase } from '../TemplateUseCase';
import { TemplateOperation } from '../types/Operation';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { LikeClickedUser } from '../../../dto/values/LikeClickedUser';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { Likes } from '../../../domain/entity/Likes';
import { LikeHelper } from 'src/domain/template/infrastructure/adapter/input/helper/Like.Helper';
import { UserApi } from 'src/domain/template/infrastructure/adapter/output/apis/User.Api';

@Injectable()
export class LikePressUserCollector
  implements TemplateUseCase<[number], Promise<LikeClickedUser[]>>
{
  operation: TemplateOperation = 'SELECT_PRESS_USER';

  constructor(
    private readonly likeHelper: LikeHelper,
    private readonly dataMapperService: DataMapperService,
    private readonly userApi: UserApi,
  ) {}

  async handle(request: [number]): Promise<LikeClickedUser[]> {
    const [userTemplateId] = request;
    const likeDatas = await this.likeHelper.giveLikesByUserTemplateId(userTemplateId);
    return likeDatas.length === 0
      ? ([] as LikeClickedUser[])
      : this.processLikeClickedLogic(likeDatas);
  }

  private async processLikeClickedLogic(likeDatas: Likes[]) {
    const extractedAffiliationIds = this.dataMapperService.extractAffiliationId(likeDatas);
    const affiliationDatas =
      await this.userApi.requestAffiliationAndUserById(extractedAffiliationIds);
    return this.mappedClickedUser(affiliationDatas);
  }

  private mappedClickedUser(affiliationDatas: Affiliation[]) {
    return affiliationDatas.map((affiliationData) => {
      return LikeClickedUser.of(
        affiliationData.getUser().getProfileImage(),
        affiliationData.getNickname(),
      );
    });
  }
}
