import { Injectable } from '@nestjs/common';
import { Organization } from 'src/domain/user/domain/entity/Organization';
import { User } from 'src/domain/user/domain/entity/User';
import { OrganizationHelper } from 'src/domain/user/helper/Organization.Helper';
import { UserHelper } from 'src/domain/user/helper/User.Helper';

@Injectable()
export class UserApi {
  constructor(
    private readonly organizationHelper: OrganizationHelper,
    private readonly userHelper: UserHelper,
  ) {}

  public async requestAllOrganization(): Promise<Organization[]> {
    return this.organizationHelper.giveAllOrganization();
  }

  public async requestUserById(userId: number): Promise<User> {
    return this.userHelper.giveUserById(userId);
  }
}
