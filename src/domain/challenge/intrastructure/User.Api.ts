import { Injectable } from '@nestjs/common';
import { Organization } from 'src/domain/user/domain/entity/Organization';
import { OrganizationHelper } from 'src/domain/user/helper/Organization.Helper';

@Injectable()
export class UserApi {
  constructor(private readonly organizationHelper: OrganizationHelper) {}

  public async requestAllOrganization(): Promise<Organization[]> {
    return this.organizationHelper.giveAllOrganization();
  }
}
