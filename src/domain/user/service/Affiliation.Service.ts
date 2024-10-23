import { Injectable } from '@nestjs/common';
import { Organization } from '../domain/entity/Organization';
import { UserProfile } from '../dto/response/UserProfile';
import { OrganizationHelper } from '../helper/Organization.Helper';
import { AffiliationHelper } from '../helper/Affiliation.Helper';
import { AffiliationStart } from '../dto/request/AffiliationStart';
import { ProfileUpdate } from '../dto/request/ProfileUpdate';
import { UserVerifyService } from '../../../global/exception/user/UserVerify.Service';

@Injectable()
export class AffiliationService {
  constructor(
    private readonly organizationHelper: OrganizationHelper,
    private readonly affiliationHelper: AffiliationHelper,
    private readonly userVerifyService: UserVerifyService,
  ) {}

  public async penetrateAffiliation(
    userId: number,
    affiliationStartDto: AffiliationStart,
  ): Promise<void> {
    const organizationData: Organization =
      await this.organizationHelper.giveOrganizationByName(
        affiliationStartDto.getOrganization(),
      );
    const affiliationData =
      await this.affiliationHelper.giveAffiliationByUserIdWithOrganization(
        userId,
        affiliationStartDto.getOrganization(),
      );
    this.userVerifyService.verifyExistAffiliation(affiliationData);
    await this.affiliationHelper.insertAffiliation(
      userId,
      organizationData.getId(),
      affiliationStartDto,
    );
  }

  public async bringUserProfile(
    userId: number,
    organization: string,
  ): Promise<UserProfile> {
    const userProfileData: UserProfile =
      await this.affiliationHelper.giveUserProfileByUserIdAndOrganization(
        userId,
        organization,
      );
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
