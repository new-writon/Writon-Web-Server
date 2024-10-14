import { Inject, Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../domain/repository/Organization.Repository';
import { Organization } from '../domain/entity/Organization';
import { UserVerifyService } from '../../../global/exception/user/UserVerify.Service';

@Injectable()
export class OrganizationHelper {
  constructor(
    @Inject('organizationImpl')
    private readonly organizationRepository: OrganizationRepository,
    private readonly userVerifyService: UserVerifyService,
  ) {}

  public async giveOrganizationByName(name: string): Promise<Organization> {
    return this.organizationRepository.findOrganizationByName(name);
  }

  public async giveAllOrganization() {
    return this.organizationRepository.findAllOrganization();
  }

  public async givePositionsByOrganizationId(organization: string) {
    return this.organizationRepository.findPositionsByOrganizationId(
      organization,
    );
  }
}
