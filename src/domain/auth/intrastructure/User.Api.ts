import { Injectable } from '@nestjs/common';
import { Affiliation } from '../../../domain/user/domain/entity/Affiliation';
import { AffiliationHelper } from '../../../domain/user/helper/Affiliation.Helper';
import { UserHelper } from '../../user/helper/User.Helper';
import { UserChallengeHelper } from '../../../domain/user/helper/UserChallenge.Helper';
import { AuthToken } from '../../user/domain/entity/AuthToken';

@Injectable()
export class UserApi {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly affiliationHelper: AffiliationHelper,
    private readonly userChallengeHelper: UserChallengeHelper,
  ) {}

  public async requestUserDataBySocialNumberOrIdentifier(idenfitier: string) {
    return this.userHelper.giveUserDataBySocialNumberOrIdentifier(idenfitier);
  }

  public async requestLocalSignUp(identifier: string, password: string, email: string) {
    return this.userHelper.executeLocalSignUp(identifier, password, email);
  }

  public async requestUserByEmail(email: string) {
    return this.userHelper.giveUserByEmail(email);
  }

  public async requestUpdatePassword(idenfitier: string, email: string, password: string) {
    return this.userHelper.executeUpdatePassword(idenfitier, email, password);
  }

  public async giveUserById(userId: number) {
    return this.userHelper.giveUserById(userId);
  }

  public async executeUpdatePasswordByUserId(userId: number, password: string) {
    return this.userHelper.executeUpdatePasswordByUserId(userId, password);
  }

  public async executeKakaoSignUp(email: string, kakaoId: string, profileImage: string) {
    return this.userHelper.executeKakaoSignUp(email, kakaoId, profileImage);
  }

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
  ) {
    return this.userChallengeHelper.giveUserChallengeByUserIdAndOrganizationAndChallengeId(
      userId,
      organization,
      challengeId,
    );
  }

  public async requestFirebaseTokenByUserIdAndEngineValue(userId: number, engineValue: string) {
    return this.userHelper.giveFirebaseTokenByUserIdAndEngineValue(userId, engineValue);
  }

  public async executeInsertFirebaseToken(userId: number, engineValue: string) {
    await this.userHelper.executeInsertFirebaseToken(userId, engineValue);
  }

  public async executeDeleteFirebaseToken(userId: number, engineValue: string) {
    await this.userHelper.executeDeleteFirebaseToken(userId, engineValue);
  }

  public async executeDeleteAuthToken(userId: number, token: string) {
    await this.userHelper.executeDeleteAuthToken(userId, token);
  }

  public async executeInsertAuthToken(userId: number, token: string) {
    await this.userHelper.executeInsertAuthToken(userId, token);
  }

  public async requestAuthTokenByUserIdAndToken(userId: number, token: string): Promise<AuthToken> {
    return this.userHelper.giveAuthTokenByUserIdAndToken(userId, token);
  }

  public async executeInsertWritonerChallenge(affiliation: Affiliation) {
    return this.userChallengeHelper.executeInsertWritonerChallenge(affiliation);
  }
}
