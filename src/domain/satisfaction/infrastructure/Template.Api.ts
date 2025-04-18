import { Injectable } from '@nestjs/common';
import { UserTemplateHelper } from 'src/domain/template/application/helper/UserTemplate.Helper';

@Injectable()
export class TemplateApi {
  constructor(private readonly userTemplateHelper: UserTemplateHelper) {}

  public async reqeustChallengeSuccessChallengeCount(userChallengeId: number): Promise<number> {
    return this.userTemplateHelper.giveChallengeSuccessChallengeCount(userChallengeId);
  }
}
