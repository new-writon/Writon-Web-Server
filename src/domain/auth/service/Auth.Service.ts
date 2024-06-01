import {  Injectable } from "@nestjs/common";
import { LoginResponse } from "../dto/response/loginResponse.js";
import { SocialLogin } from "../util/SocialLogin.js";
import { User } from "../../user/domain/entity/User.js";
import { AxiosResponse } from "axios";
import { JwtManager } from "../util/JwtManager.js";
import { TokenManager } from "../../../global/util/TokenManager.js";
import { UserChallenge } from "../../user/domain/entity/UserChallenge.js";
import { checkData } from "../util/checker.js";
import { Affiliation } from "../../user/domain/entity/Affiliation.js";
import { verifyPassword, vefifyIdentifier } from "../util/checker.js";
import { UserApi } from "../intrastructure/User.Api.js";

@Injectable()
export class AuthService {

    constructor(
        private readonly socialLogin: SocialLogin,
        private readonly jwtManager: JwtManager,
        private readonly tokenManager: TokenManager,
     //   private readonly userHelper: UserHelper,
        private readonly userApi: UserApi,
      //  private readonly affiliationHelper: AffiliationHelper,
      //  private readonly userChallengeHelper: UserChallengeHelper
    ) { }


    public async kakaoLogin(organization: string, challengeId: number, kakaoToken: string): Promise<LoginResponse> {

        const kakaoData = await this.socialLogin.getKakaoData(kakaoToken);
        const userData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(kakaoData.data.id);
        await this.signInDependingOnRegistrationStatus(userData, kakaoData);
        const checkedUserData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(kakaoData.data.id);
        const accessToken = this.jwtManager.makeAccessToken(checkedUserData.getId(), checkedUserData.getRole()); // 해당 데이터 자체를 User엔티티에 넣어주기 유저 엔티티 함수에서 get함수를 통해 토큰 구현
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.tokenManager.setToken(String(checkedUserData.getId()), refreshToken);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, checkedUserData.getId()),
            this.checkOngoingChallenge(organization, checkedUserData.getId(), challengeId)
        ]);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, checkedUserData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    public async localLogin(identifier: string, password: string, organization: string, challengeId: number): Promise<LoginResponse> {

        const userData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(identifier);
        vefifyIdentifier(userData);
        await verifyPassword(password, userData.getPassword())
        const accessToken = this.jwtManager.makeAccessToken(userData.getId(), userData.getRole());
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.tokenManager.setToken(String(userData.getId()), refreshToken);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, userData.getId()),
            this.checkOngoingChallenge(organization, userData.getId(), challengeId)
        ]);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, userData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    public async logout(userId: string): Promise<void> {
        await this.tokenManager.deleteToken(userId)
    }

    private checkOrganization(organization: string, affiliatedConfirmation: boolean): null | boolean {
        if (organization === "null") {
            return affiliatedConfirmation = null
        }
        return affiliatedConfirmation;
    }

    private async signInDependingOnRegistrationStatus(userData: User, kakaoData: AxiosResponse<any, any>) {
        if (!checkData(userData)) {
            this.userApi.executeKakaoSignUp(kakaoData.data.kakao_account.email, kakaoData.data.id, kakaoData.data.properties.profile_image);
        }
    }

    public async checkAffiliationStatus(
        organization: string,
        userId: number
    ): Promise<boolean | null> {

        const checkAffiliation: Affiliation = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
        const affiliatedConfirmation: boolean = checkData(checkAffiliation);
        return affiliatedConfirmation;
    }

    private async checkOngoingChallenge(
        organization: string,
        userId: number,
        challengeId: number
    ): Promise<boolean | null> {

        const checkChallenge: UserChallenge[] = await this.userApi.requestUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId);
        const challengedConfirmation: boolean = checkData(checkChallenge[0]);
        return challengedConfirmation;
    }




}