import { Injectable } from '@nestjs/common';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { Organization } from 'src/domain/user/domain/entity/Organization';
import { User } from 'src/domain/user/domain/entity/User';
import { OrganizationHelper } from 'src/domain/user/helper/Organization.Helper';
import { UserHelper } from 'src/domain/user/helper/User.Helper';
import { UserChallengeHelper } from 'src/domain/user/helper/UserChallenge.Helper';
import { Challenge } from '../../domain/entity/Challenge';

@Injectable()
export class UserApi {
  constructor(
    private readonly organizationHelper: OrganizationHelper,
    private readonly userHelper: UserHelper,
    private readonly userChallengeHelper: UserChallengeHelper,
  ) {}

  public async requestAllOrganization(): Promise<Organization[]> {
    return this.organizationHelper.giveAllOrganization();
  }

  public async requestUserById(userId: number): Promise<User> {
    return this.userHelper.giveUserById(userId);
  }

  public async requestUserChallengeByAffiliationAndChallenge(
    affiliation: Affiliation,
    challenge: Challenge,
  ) {
    return this.userChallengeHelper.giveUserChallengeByAffiliationIdAndChallengeId(
      affiliation.getId(),
      challenge.getId(),
    );
  }
}
