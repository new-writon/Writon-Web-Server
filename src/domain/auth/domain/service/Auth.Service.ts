import { Inject, Injectable } from "@nestjs/common";
import { KakaoLoginResponse } from "../../dto/KakaoLogin.Response.js";
import { KakaoLoginRequest } from "../../dto/KakaoLogin.Request.js";
import { SocialLogin } from "../../util/SocialLogin.js";
import { User } from "../../../user/domain/entity/User.js";
import { AxiosResponse } from "axios";
import { UserDao } from "../../../user/domain/repository/User.Dao.js";import { UserRepository } from "src/domain/user/domain/repository/User.Repository.js";
import { JwtManager } from "../../util/JwtManager.js";
import { CACHE_MANAGER, Cache  } from "@nestjs/cache-manager";
import { TokenManager } from "../../../../global/util/TokenManager.js";



@Injectable()
export class AuthService {

    constructor(
        @Inject('impl') private readonly userRepository: UserRepository,
        private readonly socialLogin: SocialLogin,
        private readonly jwtManager: JwtManager,
        private readonly tokenManager: TokenManager
    ) {}

    public async kakaoLogin(KakaoLoginRequest : KakaoLoginRequest, kakaoToken: string): Promise<KakaoLoginResponse>{
        console.log(kakaoToken)

        const kakaoData = await this.socialLogin.getKakaoData(kakaoToken);
        const userData: User = await this.userRepository.selectUserDataBySocialNumber(kakaoData.data.id);
        await this.signInDependingOnRegistrationStatus(userData, kakaoData);
        const checkedUserData: User = await this.userRepository.selectUserDataBySocialNumber(kakaoData.data.id);
        const accessToken = this.jwtManager.makeAccessToken(checkedUserData.getUserId(), checkedUserData.getRole());
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.tokenManager.setToken(String(checkedUserData.getUserId()), refreshToken);
        // let [ affiliatedConfirmation, challengedConfirmation] = await Promise.all([
        //     this.checkAffiliationStatus(KakaoLoginRequest.getOrganization(), checkedUserData.getUserId()),
        //     this.checkOngoingChallenge(KakaoLoginRequest.getOrganization(), checkedUserData.getUserId(), KakaoLoginRequest.getChallengeId())
        //   ]);
        this.checkOrganization(KakaoLoginRequest.getOrganization(), true);
        return KakaoLoginResponse.of(accessToken, refreshToken, checkedUserData.getRole(), true, true);

    }

    private checkOrganization(organization: string, affiliatedConfirmation: boolean): void {
        if (organization === "null") {
            affiliatedConfirmation = null
          }
    }

    private async signInDependingOnRegistrationStatus(userData: User, kakaoData: AxiosResponse<any, any>){

        if (!userData) {
            this.userRepository.kakaoSignUp(kakaoData.data.kakao_account.email, kakaoData.data.id, kakaoData.data.properties.profile_image);
          }
    }

    // public async checkAffiliationStatus (
    //     organization: string,
    //     userId: number
    // ): Promise<boolean | null>{
    //     let affiliatedConfirmation;
    //     const checkAffiliation = await organizationDao.selectAffiliation(organization, userId);
    //     if (!checkAffiliation?.affiliations![0]) {
    //         affiliatedConfirmation = false;
    //     } else {
    //         affiliatedConfirmation = true;
    //     }
    //     return affiliatedConfirmation;
    // }

    // private async checkOngoingChallenge(
    //     organization: string,
    //     userId: number,
    //     challengeId: number
    // ): Promise<boolean | null> {
    
    //     let challengedConfirmation;
    //     const checkChallenge = await userChallengeDao.selectUserChallenge(userId, organization, challengeId);
    //     if (!checkChallenge) {
    //         challengedConfirmation = false;
    
    //     } else {
    //         challengedConfirmation = true;
    //     }
    //     return challengedConfirmation;
    // }
    



}