import { Inject, Injectable } from "@nestjs/common";
import { LoginResponse } from "../../dto/loginResponse.js";
import { SocialLogin } from "../../util/SocialLogin.js";
import { User } from "../../../user/domain/entity/User.js";
import { AxiosResponse } from "axios";
import { UserRepository } from "src/domain/user/domain/repository/User.Repository.js";
import { JwtManager } from "../../util/JwtManager.js";
import { TokenManager } from "../../../../global/util/TokenManager.js";
import { UserAffiliationOrganization } from "src/domain/interface/UserAffilatiionOrganization.interface.js";
import { UserChallenge } from "src/domain/user/domain/entity/UserChallenge.js";
import { Login } from "../../dto/values/Login.js";
import bcrypt from 'bcrypt';
import { AuthException } from "../../exception/AuthException.js";
import { AuthErrorCode } from "../../exception/AuthErrorCode.js";



@Injectable()
export class AuthService {

    constructor(
        @Inject('impl') private readonly userRepository: UserRepository,
        private readonly socialLogin: SocialLogin,
        private readonly jwtManager: JwtManager,
        private readonly tokenManager: TokenManager
    ) { }


    public async kakaoLogin(organization: string, challengeId: number, kakaoToken: string): Promise<LoginResponse> {

        const kakaoData = await this.socialLogin.getKakaoData(kakaoToken);
        const userData: User = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(kakaoData.data.id);
        await this.signInDependingOnRegistrationStatus(userData, kakaoData);
        const checkedUserData: User = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(kakaoData.data.id);
        const accessToken = this.jwtManager.makeAccessToken(checkedUserData.getUserId(), checkedUserData.getRole()); // 해당 데이터 자체를 User엔티티에 넣어주기 유저 엔티티 함수에서 get함수를 통해 토큰 구현
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.tokenManager.setToken(String(checkedUserData.getUserId()), refreshToken);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, checkedUserData.getUserId()),
            this.checkOngoingChallenge(organization, checkedUserData.getUserId(), challengeId)
        ]);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, checkedUserData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    public async localLogin(identifier: string, password: string, organization: string, challengeId: number): Promise<LoginResponse> {

        const userData: User = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(identifier);
        this.vefifyIdentifier(userData);
        await this.vefifyPassword(password, userData.getPassword())
        const accessToken = this.jwtManager.makeAccessToken(userData.getUserId(), userData.getRole());
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.tokenManager.setToken(String(userData.getUserId()), refreshToken);
        let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, userData.getUserId()),
            this.checkOngoingChallenge(organization, userData.getUserId(), challengeId)
        ]);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return LoginResponse.of(accessToken, refreshToken, userData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }


    public async localSignUp(identifier: string, password: string, email: string,): Promise<void> {
        const encryptedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.localSignUp(identifier, encryptedPassword, email);
    }

    public async logout(userId: string): Promise<void> {
        await this.tokenManager.deleteToken(userId)
    }

    private vefifyIdentifier(userData : User){
        if (!this.checkData(userData))   
            throw new AuthException(AuthErrorCode.IDENTIFIER_IS_INCOREECT);
    }

    /**
     * 
     * @param comparingPassword 비교할 패스워드
     * @param comparedPassword  비교 당할 패스워드
     * @returns 
     */
    private async vefifyPassword(comparingPassword: string, comparedPassword: string){
        if (! await bcrypt.compare(comparingPassword, comparedPassword)){
            throw new AuthException(AuthErrorCode.PASSWORD_IS_INCOREECT);
        }
    }


    private checkOrganization(organization: string, affiliatedConfirmation: boolean): null | boolean {
        if (organization === "null") {
            return affiliatedConfirmation = null
        }
        return affiliatedConfirmation;
    }

    private async signInDependingOnRegistrationStatus(userData: User, kakaoData: AxiosResponse<any, any>) {
        if (!this.checkData(userData)) {
            this.userRepository.kakaoSignUp(kakaoData.data.kakao_account.email, kakaoData.data.id, kakaoData.data.properties.profile_image);
        }
    }

    public async checkAffiliationStatus(
        organization: string,
        userId: number
    ): Promise<boolean | null> {

        const checkAffiliation: UserAffiliationOrganization[] = await this.userRepository.findUserAffiliation(userId, organization);
        const affiliatedConfirmation: boolean = this.checkData(checkAffiliation[0]);
        return affiliatedConfirmation;
    }

    /**
     * 
     * @param data 
     * @returns  데이터가 없을 경우 false 반환, 있을 경우 true 반환
     */
    private checkData(data: any): boolean {
        let result = true
        if (!data) {   // 데이터가 없을 경우
            return result = false;
        }
        return result;
    }

    private async checkOngoingChallenge(
        organization: string,
        userId: number,
        challengeId: number
    ): Promise<boolean | null> {

        const checkChallenge: UserChallenge[] = await this.userRepository.findUserChallenge(userId, organization, challengeId);
        const challengedConfirmation: boolean = this.checkData(checkChallenge[0]);
        return challengedConfirmation;
    }




}