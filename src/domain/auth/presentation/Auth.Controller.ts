import { Body, Controller, HttpCode, Post, Req } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AuthService } from "../domain/service/Auth.Service.js";
import { KakaoLoginRequest } from "../dto/KakaoLogin.Request.js";
import { KakaoLoginResponse } from "../dto/KakaoLogin.Response.js";


@Controller("/api/auth")
export class AuthController{


    constructor(private readonly authService: AuthService) {}

    
    @Post("/login/kakao")
    @HttpCode(200)
    public async kakaoLogin(
        @Body() kakaoLogin: KakaoLoginRequest,
        @Req() req: Request,
    ): Promise<SuccessResponseDto<KakaoLoginResponse>>  {
  
      const result : KakaoLoginResponse = await this.authService.kakaoLogin(kakaoLogin.getOrganization(), kakaoLogin.getChallengeId(), req.headers["authorization"]);
      return SuccessResponseDto.of(result);
    }

}