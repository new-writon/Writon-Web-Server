import { Inject, Injectable } from '@nestjs/common';
import { AffiliationRepository } from '../domain/repository/Affiliation.Repository';
import { Affiliation } from '../domain/entity/Affiliation';
import { ChallengesPerOrganization } from '../dto/values/ChallengesPerOrganization';
import { UserProfile } from '../dto/response/UserProfile';
import { UserVerifyService } from '../../../global/exception/user/UserVerify.Service';
import { Participant } from '../dto/response/Participant';
import { AffiliationStart } from '../dto/request/AffiliationStart';
import { ProfileUpdate } from '../dto/request/ProfileUpdate';

@Injectable()
export class AffiliationHelper {
  constructor(
    @Inject('affiliationImpl')
    private readonly affiliationRepository: AffiliationRepository,
    private readonly userVerifyService: UserVerifyService,
  ) {}

  public async giveAffiliationByUserIdWithOrganization(
    userId: number,
    organization: string,
  ): Promise<Affiliation> {
    return this.affiliationRepository.findAffiliationByUserIdWithOrganization(userId, organization);
  }

  public async giveAffiliationByNicknameAndOrganization(
    nickname: string,
    organization: string,
  ): Promise<Affiliation> {
    return this.affiliationRepository.findAffiliationByNicknameAndOrganization(
      nickname,
      organization,
    );
  }

  public async insertAffiliation(
    userId: number,
    organizationId: number,
    affiliationStartDto: AffiliationStart,
  ): Promise<Affiliation> {
    return this.affiliationRepository.insertAffiliation(
      userId,
      organizationId,
      affiliationStartDto,
    );
  }

  public async giveChallengesPerOrganizationByUserId(
    userId: number,
  ): Promise<ChallengesPerOrganization[]> {
    return this.affiliationRepository.findChallengesPerOrganizationByUserId(userId);
  }

  public async giveUserProfileByUserIdAndOrganization(
    userId: number,
    organization: string,
  ): Promise<UserProfile> {
    return this.affiliationRepository.findUserProfileByUserIdAndOrganization(userId, organization);
  }

  public async executeUpdateUserProfileByUserIdAndOrganization(
    userId: number,
    organization: string,
    profileUpdate: ProfileUpdate,
  ): Promise<void> {
    await this.affiliationRepository.updateUserProfileByUserIdAndOrganization(
      userId,
      organization,
      profileUpdate,
    );
  }

  public async giveAffilaitonWithChallengeIdArray(
    userChallengeId: number[],
  ): Promise<Affiliation[]> {
    return this.affiliationRepository.findAffilaitonWithChallengeIdArray(userChallengeId);
  }

  public async giveAffilaitonWithChallengeIdAndUserChallengeId(
    challengeId: number,
    userChallengeId: number[],
  ): Promise<Affiliation[]> {
    return this.affiliationRepository.findAffilaitonWithChallengeIdAndUserChallengeId(
      challengeId,
      userChallengeId,
    );
  }

  public async giveAffiliationById(affiliationId: number[]): Promise<Affiliation[]> {
    return this.affiliationRepository.findAffiliationById(affiliationId);
  }

  public async giveAffiliationAndUserById(affiliationId: number[]): Promise<Affiliation[]> {
    return this.affiliationRepository.findAffiliationAndUserById(affiliationId);
  }

  public async giveAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(
    userId: number,
    challengeId: number,
  ): Promise<Participant> {
    return this.affiliationRepository.findAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(
      userId,
      challengeId,
    );
  }

  public async giveAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(
    userId: number,
    challengeId: number,
  ): Promise<Participant[]> {
    return this.affiliationRepository.findAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(
      userId,
      challengeId,
    );
  }

  public async giveAffiliationAndUserByUserIdWithOrganization(
    userId: number,
    organization: string,
  ): Promise<Affiliation> {
    return this.affiliationRepository.findAffiliationAndUserByUserIdWithOrganization(
      userId,
      organization,
    );
  }

  public async giveAffiliationByOrganization(organization: string) {
    return this.affiliationRepository.findAffiliationByOrganization(organization);
  }

  public async giveAffiliationAndUserAndFirebaseTokenByAffiliationId(affiliationId: number) {
    return this.affiliationRepository.findAffiliationAndUserAndFirebaseTokenByAffiliationId(
      affiliationId,
    );
  }
}
