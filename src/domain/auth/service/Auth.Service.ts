import { Inject, Injectable } from "@nestjs/common";
import { LoginResponse } from "../dto/response/loginResponse.js";
import { SocialLogin } from "../util/SocialLogin.js";
import { User } from "../../user/domain/entity/User.js";
import { AxiosResponse } from "axios";
import { UserRepository } from "src/domain/user/domain/repository/User.Repository.js";
import { JwtManager } from "../util/JwtManager.js";
import { TokenManager } from "../../../global/util/TokenManager.js";
import { UserAffiliationOrganization } from "src/domain/interface/UserAffilatiionOrganization.interface.js";
import { UserChallenge } from "src/domain/user/domain/entity/UserChallenge.js";
import bcrypt from 'bcrypt';
import { AuthException } from "../exception/AuthException.js";
import { AuthErrorCode } from "../exception/AuthErrorCode.js";
import { AuthenticationCodeResponse } from "../dto/response/AuthenticationCodeResponse.js";
import random from "../util/random.js";
import { MailManager } from "../../../global/util/MailManager.js";
import { Token } from "../dto/response/Token.js";
import { checkData } from "../util/checker.js";
import { UserIdentifier } from "../dto/response/UserIdentifier.js";
import { generateRandomPassword } from "../util/temporaryPassword.js";


@Injectable()
export class AuthService {

    constructor(
        @Inject('userImpl') private readonly userRepository: UserRepository,
        private readonly socialLogin: SocialLogin,
        private readonly jwtManager: JwtManager,
        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager
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
        await this.verifyPassword(password, userData.getPassword())
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



    public async reissueToken(accessToken: string, refreshToken: string): Promise<Token>{

        const accessTokenVerifyResult = this.jwtManager.verify(accessToken.split('Bearer ')[1]);
        const accessTokenDecodedData = this.jwtManager.decode(accessToken.split('Bearer ')[1]);
        const refreshTokenVerifyesult = await this.jwtManager.refreshVerify(refreshToken.split('Bearer ')[1], accessTokenDecodedData.userId);
        this.signVerifyToken(accessTokenVerifyResult.state, refreshTokenVerifyesult.state);
        const newAccessToken = this.jwtManager.makeAccessToken(accessTokenDecodedData.userId, accessTokenDecodedData.role);
        return Token.of(newAccessToken, refreshTokenVerifyesult.token);

    }


    private signVerifyToken(accessTokenVerifyResult: boolean, refreshTokenVerifyesult: boolean){
        this.signVerifyAccessToken(accessTokenVerifyResult);
        this.signVerifyRefreshToken(refreshTokenVerifyesult);
    }

    private signVerifyAccessToken(status: boolean){
        if(status)
            throw new AuthException(AuthErrorCode.NOT_EXPIRED);
    }

    private signVerifyRefreshToken(status: boolean){
        if(!status)
            throw new AuthException(AuthErrorCode.LOGIN_AGAIN);           
    }

    public async issueAuthenticationCode(email: string): Promise<AuthenticationCodeResponse> {
        const verificationCode = random.generateRandom(100000, 999999);
        await this.tokenManager.setTimeoutToken(email, String(verificationCode), 180000)
        await this.mailManager.sendCodeEmail(email, verificationCode);
        return AuthenticationCodeResponse.of(verificationCode);
    }

    public async verifyAuthenticationCode(email: string, code: string): Promise<void> {

        const authenticationCode: string = await this.tokenManager.getToken(email);
        this.verifyCode(code, authenticationCode);
    }

    public async checkDuplicateIdentifier(identifier: string): Promise<void> {
        const userData : User = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(identifier);
        console.log(userData)
        this.validateIdentifier(userData);   
    }

    public async checkDuplicateEmail(email: string): Promise<void> {
        const userData : User = await this.userRepository.selectUserDataByEmail(email);
        this.validateEmail(userData);   
    }


    public async findIdentifier(email: string, code: string): Promise<UserIdentifier> {
        const userData : User = await this.userRepository.findUserByEmail(email);
        this.verifyUser(userData);
        const certifyCode :string = await this.tokenManager.getToken(email);
        this.verifyCode(code, certifyCode);
        return UserIdentifier.of(userData.getIdentifier());
  
    }

    public async generateTemporaryPassword(idenfitier:string, email:string): Promise<void> {
        const userData : User = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(idenfitier);
        this.vefifyIdentifier(userData);
        this.verifyEmail(userData, email);
        const newPassword = generateRandomPassword();
        await this.userRepository.updatePassword(idenfitier, email, await bcrypt.hash(newPassword,10));
        this.mailManager.randomPasswordsmtpSender(email, newPassword);
    }

    public async changePassword(userId: number, oldPassword: string, newPassword:string): Promise<void> {
        const userData : User = await this.userRepository.selectUserById(userId);
        await this.verifyPassword(oldPassword, userData.getPassword());
        await this.userRepository.updatePasswordByUserId(userId,await bcrypt.hash(newPassword,10))
    }
 
    private verifyCode(code: string, certifyCode: string){
        if(code !== certifyCode)
            throw new AuthException(AuthErrorCode.NOT_VERIFY_CODE);
    }

    private verifyUser(user: User){
        if(!checkData(user))
            throw new AuthException(AuthErrorCode.NOT_VERIFY_EMAIL);
    }


    private validateIdentifier(userData: User){
        if(checkData(userData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_IDENTIFIER);
        }
    }

    private validateEmail(userData: User){
        if(checkData(userData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_EMAIL);
        }
    }

    private verifyEmail(userData: User, email: string){
        if(userData.getEmail() !== email)
            throw new AuthException(AuthErrorCode.NOT_VERIFY_EMAIL);
    }



    private vefifyIdentifier(userData : User){
        if (!checkData(userData))   
            throw new AuthException(AuthErrorCode.IDENTIFIER_IS_INCOREECT);
    }


    /**
     * 
     * @param comparingPassword 비교할 패스워드
     * @param comparedPassword  비교 당할 패스워드
     * @returns 
     */
    public async verifyPassword(comparingPassword: string, comparedPassword: string){
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
        if (!checkData(userData)) {
            this.userRepository.kakaoSignUp(kakaoData.data.kakao_account.email, kakaoData.data.id, kakaoData.data.properties.profile_image);
        }
    }

    public async checkAffiliationStatus(
        organization: string,
        userId: number
    ): Promise<boolean | null> {

        const checkAffiliation: UserAffiliationOrganization[] = await this.userRepository.findUserAffiliation(userId, organization);
        const affiliatedConfirmation: boolean = checkData(checkAffiliation[0]);
        return affiliatedConfirmation;
    }

    // /**
    //  * 
    //  * @param data 
    //  * @returns  데이터가 없을 경우 false 반환, 있을 경우 true 반환
    //  */
    // private checkData(data: any): boolean {
    //     let result = true
    //     if (!data) {   // 데이터가 없을 경우
    //         return result = false;
    //     }
    //     return result;
    // }

    private async checkOngoingChallenge(
        organization: string,
        userId: number,
        challengeId: number
    ): Promise<boolean | null> {

        const checkChallenge: UserChallenge[] = await this.userRepository.findUserChallenge(userId, organization, challengeId);
        const challengedConfirmation: boolean = checkData(checkChallenge[0]);
        return challengedConfirmation;
    }




}