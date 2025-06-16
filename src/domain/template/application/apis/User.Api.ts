import { Injectable } from '@nestjs/common';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { FirebaseToken } from 'src/domain/user/domain/entity/FirebaseToken';
import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';
import { AffiliationHelper } from 'src/domain/user/helper/Affiliation.Helper';
import { UserHelper } from 'src/domain/user/helper/User.Helper';
import { UserChallengeHelper } from 'src/domain/user/helper/UserChallenge.Helper';

@Injectable()
export class UserApi {
  constructor(
    private readonly affiliationHelper: AffiliationHelper,
    private readonly userHelper: UserHelper,
    private readonly userChallengeHelper: UserChallengeHelper,
  ) {}

  public async requestAffiliationByUserIdAndOrganization(
    userId: number,
    organization: string,
  ): Promise<Affiliation> {
    return this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization);
  }

  public async requestAffiliationByNicknameAndOrganization(
    nickname: string,
    organization: string,
  ): Promise<Affiliation> {
    return this.affiliationHelper.giveAffiliationByNicknameAndOrganization(nickname, organization);
  }

  public async requestUserChallengeByUserIdAndOrganizationAndChallengeId(
    userId: number,
    organization: string,
    challengeId: number,
  ): Promise<UserChallenge[]> {
    return this.userChallengeHelper.giveUserChallengeByUserIdAndOrganizationAndChallengeId(
      userId,
      organization,
      challengeId,
    );
  }

  public async requestUserChallengeByUserTemplateIdArrayAndChallengeId(
    userChallengeId: number[],
    challengeId: number,
  ): Promise<UserChallenge[]> {
    return this.userChallengeHelper.giveUserChallengeByUserTemplateIdArrayAndChallengeId(
      userChallengeId,
      challengeId,
    );
  }

  public async requestAffilaitonWithChallengeIdArray(
    userChallengeId: number[],
  ): Promise<Affiliation[]> {
    return this.affiliationHelper.giveAffilaitonWithChallengeIdArray(userChallengeId);
  }

  public async requestAffilaitonWithChallengeIdAndUserChallengeId(
    challengeId: number,
    userChallengeId: number[],
  ): Promise<Affiliation[]> {
    return this.affiliationHelper.giveAffilaitonWithChallengeIdAndUserChallengeId(
      challengeId,
      userChallengeId,
    );
  }

  public async requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(
    challengeId: number,
    userId: number,
    organization: string,
  ): Promise<UserChallenge> {
    return this.userChallengeHelper.giveUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(
      challengeId,
      userId,
      organization,
    );
  }

  public async requestAffiliationById(affiliationId: number[]): Promise<Affiliation[]> {
    return this.affiliationHelper.giveAffiliationById(affiliationId);
  }

  public async requestUserChallengeAndAffiliationAndUserByChallengeId(
    challengeId: number,
  ): Promise<UserChallenge[]> {
    return this.userChallengeHelper.giveUserChallengeAndAffiliationAndUserByChallengeId(
      challengeId,
    );
  }

  public async requestAffiliationAndUserByUserIdAndOrganization(
    userId: number,
    organization: string,
  ): Promise<Affiliation> {
    return this.affiliationHelper.giveAffiliationAndUserByUserIdWithOrganization(
      userId,
      organization,
    );
  }

  public async requestAffiliationAndUserById(affiliationId: number[]): Promise<Affiliation[]> {
    // 검증 x
    return this.affiliationHelper.giveAffiliationAndUserById(affiliationId);
  }

  public async requestUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
    userChallengeId: number,
  ): Promise<UserChallenge> {
    return this.userChallengeHelper.giveUserChallengeAndAffiliationAndUserAndFirebaseTokenById(
      userChallengeId,
    );
  }

  public async requestUserChallengeByAffiliationIdAndChallengeId(
    affiliationId: number,
    challengeId: number,
  ): Promise<UserChallenge> {
    return this.userChallengeHelper.giveUserChallengeByAffiliationIdAndChallengeId(
      affiliationId,
      challengeId,
    );
  }

  public async requestFirebaseTokenWithUserChallengeId(
    userChallengeId: number,
  ): Promise<FirebaseToken[]> {
    return this.userHelper.giveFirebaseTokenWithUserChallengeId(userChallengeId);
  }

  public async requestUserChallengeById(userTemplateId: number) {
    return this.userChallengeHelper.giveUserChallengeById(userTemplateId);
  }
}
