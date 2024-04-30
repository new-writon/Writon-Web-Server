import { Inject, Injectable } from "@nestjs/common";
import { KakaoLoginResponse } from "../../dto/KakaoLogin.Response.js";
import { KakaoLoginRequest } from "../../dto/KakaoLogin.Request.js";
import { SocialLogin } from "../../util/SocialLogin.js";
import { User } from "../../../user/domain/entity/User.js";
import { AxiosResponse } from "axios";
import { UserDao } from "../../../user/domain/repository/dao/User.Dao.js";import { UserRepository } from "src/domain/user/domain/repository/User.Repository.js";
import { JwtManager } from "../../util/JwtManager.js";
import { CACHE_MANAGER, Cache  } from "@nestjs/cache-manager";
import { TokenManager } from "../../../../global/util/TokenManager.js";
import { UserAffiliationOrganization } from "src/domain/interface/UserAffilatiionOrganization.interface.js";
import { UserChallenge } from "src/domain/user/domain/entity/UserChallenge.js";



@Injectable()
export class AuthService {

    constructor(
        @Inject('impl') private readonly userRepository: UserRepository,
        private readonly socialLogin: SocialLogin,
        private readonly jwtManager: JwtManager,
        private readonly tokenManager: TokenManager
    ) {}


    public async kakaoLogin(organization: string, challengeId: number, kakaoToken: string): Promise<KakaoLoginResponse>{

        const kakaoData = await this.socialLogin.getKakaoData(kakaoToken);
        const userData: User = await this.userRepository.selectUserDataBySocialNumber(kakaoData.data.id);
        await this.signInDependingOnRegistrationStatus(userData, kakaoData);
        const checkedUserData: User = await this.userRepository.selectUserDataBySocialNumber(kakaoData.data.id);
        const accessToken = this.jwtManager.makeAccessToken(checkedUserData.getUserId(), checkedUserData.getRole()); // 해당 데이터 자체를 User엔티티에 넣어주기 유저 엔티티 함수에서 get함수를 통해 토큰 구현
        const refreshToken = this.jwtManager.makeRefreshToken();
        await this.tokenManager.setToken(String(checkedUserData.getUserId()), refreshToken);
        let [ affiliatedConfirmation, challengedConfirmation] = await Promise.all([
            this.checkAffiliationStatus(organization, checkedUserData.getUserId()),
            this.checkOngoingChallenge(organization, checkedUserData.getUserId(), challengeId)
          ]);
        affiliatedConfirmation = this.checkOrganization(organization, affiliatedConfirmation);
        return KakaoLoginResponse.of(accessToken, refreshToken, checkedUserData.getRole(), affiliatedConfirmation, challengedConfirmation);
    }

    private checkOrganization(organization: string, affiliatedConfirmation: boolean): null | boolean{
        if(organization === "null") {
            return affiliatedConfirmation = null
          }
        return affiliatedConfirmation;
    }

    private async signInDependingOnRegistrationStatus(userData: User, kakaoData: AxiosResponse<any, any>){
        if (!this.checkData(userData)) {
            this.userRepository.kakaoSignUp(kakaoData.data.kakao_account.email, kakaoData.data.id, kakaoData.data.properties.profile_image);
          }
    }

    public async checkAffiliationStatus(
        organization: string,
        userId: number
    ): Promise<boolean | null>{
       
        const checkAffiliation : UserAffiliationOrganization[] = await this.userRepository.findUserAffiliation(userId, organization);
        const affiliatedConfirmation: boolean = this.checkData(checkAffiliation[0]);
        return affiliatedConfirmation;
    }

    private checkData(data:any): boolean{
        let result = true
        if (!data) {
            return result = false;
        }
        return result;
    }

    private async checkOngoingChallenge(
        organization: string,
        userId: number,
        challengeId: number
    ): Promise<boolean | null> {
    
        const checkChallenge : UserChallenge[] = await this.userRepository.findUserChallenge(userId, organization, challengeId);
        const challengedConfirmation: boolean = this.checkData(checkChallenge[0]);
        return challengedConfirmation;
    }
    



}