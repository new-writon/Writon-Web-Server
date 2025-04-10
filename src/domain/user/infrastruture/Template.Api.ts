import { Injectable } from '@nestjs/common';
import { UserTemplate } from 'src/domain/template/domain/entity/UserTemplate';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';

@Injectable()
export class TemplateApi {
  constructor(private readonly userTemplateHelper: UserTemplateHelper) {}

  public async requestUserTemplateByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]> {
    return this.userTemplateHelper.giveUserTemplateByUserChallengeId(userChallengeId);
  }

  public async requestChallengeSuccessChallengeCount(userChallengeId: number): Promise<number> {
    return this.userTemplateHelper.giveChallengeSuccessChallengeCount(userChallengeId);
  }

  public async requestUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]) {
    return this.userTemplateHelper.giveUserTemplateSuccessCountByUserChallengeIds(userChallengeIds);
  }
}
