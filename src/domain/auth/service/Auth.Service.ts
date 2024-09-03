import {  Injectable } from "@nestjs/common";
import { LoginResponse } from "../dto/response/loginResponse";
import { SocialLogin } from "../util/SocialLogin";
import { User } from "../../user/domain/entity/User";
import { AxiosResponse } from "axios";
import { JwtManager } from "../util/JwtManager";
import { UserChallenge } from "../../user/domain/entity/UserChallenge";
import { checkData } from "../util/checker";
import { Affiliation } from "../../user/domain/entity/Affiliation";
import { UserApi } from "../intrastructure/User.Api";
import { AuthVerifyService } from "../domain/service/AuthVerify.Service";
import { LoginTokenManager } from "../util/LoginTokenManager";

@Injectable()
export class AuthService {

    constructor(
        private readonly socialLogin: SocialLogin,
        private readonly jwtManager: JwtManager,
        private readonly loginTokenManager: LoginTokenManager,
        private readonly userApi: UserApi,
        private readonly authVerifyService: AuthVerifyService
    ) { }


    public async kakaoLogin(organization: string, challengeId: number, kakaoToken: string): Promise<LoginResponse> {
        const kakaoData = await this.socialLogin.getKakaoData(kakaoToken);
        const userData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(kakaoData.data.id,false);
        await this.signInDependingOnRegistrationStatus(userData, kakaoData);
        const checkedUserData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(kakaoData.data.id, false);
        const accessToken = this.jwtManager.makeAccessToken(checkedUserData.getId(), checkedUserData.getRole()); // 해당 데이터 자체를 User엔티티에 넣어주기 유저 엔티티 함수에서 get함수를 통해 토큰 구현
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.loginTokenManager.setToken(String(checkedUserData.getId()), [refreshToken], 30 * 24 * 60 * 60);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, checkedUserData.getId()),
            this.checkOngoingChallenge(organization, checkedUserData.getId(), challengeId)
        ]);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, checkedUserData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    public async localLogin(identifier: string, password: string, organization: string, challengeId: number): Promise<LoginResponse> {
        const userData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(identifier,false);
        this.authVerifyService.vefifyIdentifier(userData);
        await this.authVerifyService.verifyPassword(password, userData.getPassword())
        const accessToken = this.jwtManager.makeAccessToken(userData.getId(), userData.getRole());
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.loginTokenManager.setToken(String(userData.getId()), [refreshToken] , 30 * 24 * 60 * 60);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, userData.getId()),
            this.checkOngoingChallenge(organization, userData.getId(), challengeId)
        ]);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, userData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    public async logout(userId: string, refreshToken:string): Promise<void> {
        await this.loginTokenManager.deleteToken(userId, refreshToken)
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
        const checkAffiliation: Affiliation = await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization,false);
        const affiliatedConfirmation: boolean = checkData(checkAffiliation);
        return affiliatedConfirmation;
    }

    private async checkOngoingChallenge(
        organization: string,
        userId: number,
        challengeId: number
    ): Promise<boolean | null> {
        const checkChallenge: UserChallenge[] = await this.userApi.requestUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId,false);
        const challengedConfirmation: boolean = checkData(checkChallenge[0]);
        return challengedConfirmation;
    }
}