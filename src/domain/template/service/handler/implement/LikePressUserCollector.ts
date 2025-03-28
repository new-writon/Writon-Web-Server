import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { TemplateOperation } from '../../types/Operation';
import { LikeHelper } from '../../../helper/Like.Helper';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { UserApi } from '../../../infrastructure/User.Api';
import { LikeClickedUser } from '../../../dto/values/LikeClickedUser';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { Likes } from '../../../domain/entity/Likes';

@Injectable()
export class LikePressUserCollector
  implements TemplateHandler<[number], Promise<LikeClickedUser[]>>
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
