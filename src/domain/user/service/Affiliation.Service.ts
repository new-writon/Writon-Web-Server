import { Injectable } from '@nestjs/common';
import { Organization } from '../domain/entity/Organization';
import { UserProfile } from '../dto/response/UserProfile';
import { OrganizationHelper } from '../helper/Organization.Helper';
import { AffiliationHelper } from '../helper/Affiliation.Helper';
import { AffiliationStart } from '../dto/request/AffiliationStart';
import { ProfileUpdate } from '../dto/request/ProfileUpdate';
import { UserVerifyService } from '../../../global/exception/user/UserVerify.Service';
import { Writoner } from '../util/Writoner';
import { UserChallenge } from '../domain/entity/UserChallenge';

@Injectable()
export class AffiliationService {
  constructor(
    private readonly organizationHelper: OrganizationHelper,
    private readonly affiliationHelper: AffiliationHelper,
    private readonly userVerifyService: UserVerifyService,
    private readonly writoner: Writoner,
  ) {}

  public async penetrateAffiliation(
    userId: number,
    affiliationStartDto: AffiliationStart,
  ): Promise<void | UserChallenge> {
    const organizationData: Organization = await this.organizationHelper.giveOrganizationByName(
      affiliationStartDto.getOrganization(),
    );
    const affiliationData = await this.affiliationHelper.giveAffiliationByUserIdWithOrganization(
      userId,
      affiliationStartDto.getOrganization(),
    );
    this.userVerifyService.verifyExistAffiliation(affiliationData);
    const affiliation = await this.affiliationHelper.insertAffiliation(
      userId,
      organizationData.getId(),
      affiliationStartDto,
    );
    return organizationData.getName() === '라이톤' && this.writoner.execute(affiliation);
  }

  public async bringUserProfile(userId: number, organization: string): Promise<UserProfile> {
    const userProfileData: UserProfile =
      await this.affiliationHelper.giveUserProfileByUserIdAndOrganization(userId, organization);
    return UserProfile.of(userProfileData);
  }

  public async modifyProfileUpdate(
    userId: number,
    organization: string,
    profileUpdate: ProfileUpdate,
  ) {
    await this.affiliationHelper.executeUpdateUserProfileByUserIdAndOrganization(
      userId,
      organization,
      profileUpdate,
    );
  }
}
