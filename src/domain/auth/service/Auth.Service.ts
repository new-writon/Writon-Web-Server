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
import { AuthVerifyService } from "../../../global/exception/auth/AuthVerify.Service";
import { LoginTokenManager } from "../util/LoginTokenManager";
import { LocalLogin } from "../dto/request/LocalLogin";
import { DataSource } from "typeorm";
import { Transactional } from "../../..//global/decorator/transaction";



@Injectable()
export class AuthService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly socialLogin: SocialLogin,
        private readonly jwtManager: JwtManager,
        private readonly loginTokenManager: LoginTokenManager,
        private readonly userApi: UserApi,
        private readonly authVerifyService: AuthVerifyService
    ) { }


    @Transactional()
    public async kakaoLogin(organization: string, challengeId: number, kakaoToken: string, engineValue:string): Promise<LoginResponse> {
        const kakaoData = await this.socialLogin.getKakaoData(kakaoToken);
        const userData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(kakaoData.data.id);
        await this.signInDependingOnRegistrationStatus(userData, kakaoData);
        const checkedUserData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(kakaoData.data.id);
        const accessToken = this.jwtManager.makeAccessToken(checkedUserData.getId(), checkedUserData.getRole()); // 해당 데이터 자체를 User엔티티에 넣어주기 유저 엔티티 함수에서 get함수를 통해 토큰 구현
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.loginTokenManager.setToken(String(checkedUserData.getId()), [refreshToken], 30 * 24 * 60 * 60);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, checkedUserData.getId()),
            this.checkOngoingChallenge(organization, checkedUserData.getId(), challengeId)
        ]);
        const deviceType = this.checkDeviceType(engineValue);
        await this.proccessFirebaseTokenLogic(deviceType, userData, engineValue);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, checkedUserData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    @Transactional()
    public async localLogin(loginLocal: LocalLogin, engineValue:string): Promise<LoginResponse> {
        const userData: User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(loginLocal.getIdentifier());
        this.authVerifyService.vefifyIdentifier(userData);
        await this.authVerifyService.verifyPassword(loginLocal.getPassword(), userData.getPassword())
        const accessToken = this.jwtManager.makeAccessToken(userData.getId(), userData.getRole());
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.loginTokenManager.setToken(String(userData.getId()), [refreshToken] , 30 * 24 * 60 * 60);
        const deviceType = this.checkDeviceType(engineValue);
        await this.proccessFirebaseTokenLogic(deviceType, userData, engineValue);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(loginLocal.getOrganization(), userData.getId()),
            this.checkOngoingChallenge(loginLocal.getOrganization(), userData.getId(), loginLocal.getChallengeId())
        ]);
        affiliatedConfirmation = this.checkOrganization(loginLocal.getOrganization(), affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, userData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    private async proccessFirebaseTokenLogic(deviceType:string, userData:User, engineValue:string){
        if(deviceType === 'phone'){
            const firebaseTokenData = await this.userApi.requestFirebaseTokenByUserIdAndEngineValue(userData.getId(), engineValue);
            const flag = checkData(firebaseTokenData);
            await this.insertFirebaseTokenIfNotExists(flag, userData.getId(), engineValue);
        }
    }

    private checkDeviceType(engineValue:string){
        if(engineValue === "null") return 'computer';
        return 'phone';
    }

    private async insertFirebaseTokenIfNotExists(flag:boolean, userId:number, engineValue:string){
        if(!flag){ await this.userApi.executeInsertFirebaseToken(userId, engineValue);}
    }

    @Transactional()
    public async logout(userId: string, refreshToken:string, engineValue:string): Promise<void> {
        await this.loginTokenManager.deleteToken(userId, refreshToken);
        const deviceType = this.checkDeviceType(engineValue);
        await this.deleteFirebaseTokenByDeviceType(deviceType, Number(userId), engineValue)
    }

    private async deleteFirebaseTokenByDeviceType(deviceType:string, userId:number, engineValue:string){
        if(deviceType === 'phone'){ await this.userApi.executeDeleteFirebaseToken(userId, engineValue);}
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