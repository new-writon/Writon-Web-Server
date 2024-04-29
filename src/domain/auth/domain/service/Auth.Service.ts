import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../../user/domain/repository/User.Repository.js";
import { KakaoLoginResponse } from "../../dto/KakaoLogin.Response.js";
import { KakaoLoginRequest } from "../../dto/KakaoLogin.Request.js";
import { SocialLogin } from "../../util/SocialLogin.js";
import { User } from "src/domain/user/domain/entity/User.js";
import { AxiosResponse } from "axios";



@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly socialLogin: SocialLogin
    ) {}

    public async kakaoLogin(kakaoLogin : KakaoLoginRequest, kakaoToken: string): Promise<KakaoLoginResponse>{

        const kakaoData = await this.socialLogin.getKakaoData(kakaoToken);
        const userData: User = await this.userRepository.selectUserDataBySocialNumber(kakaoData.data.id);
        await this.signInDependingOnRegistrationStatus(userData, kakaoData);
        const checkedUserData = await this.userRepository.selectUserDataBySocialNumber(kakaoData.data.id);


        return 

    }



    private async signInDependingOnRegistrationStatus(userData: User, kakaoData: AxiosResponse<any, any>){

        if (!userData) {
            await this.userRepository.kakaoSignUp(kakaoData.data.kakao_account.email, kakaoData.data.id, kakaoData.data.properties.profile_image);
          }
    }

}