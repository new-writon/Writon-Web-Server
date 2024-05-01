import { Body, Controller, Delete, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AuthService } from "../domain/service/Auth.Service.js";
import { KakaoLoginRequest } from "../dto/KakaoLogin.Request.js";
import { KakaoLoginResponse } from "../dto/KakaoLogin.Response.js";
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { User } from "../../user/domain/entity/User.js";

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

    @Delete("/logout")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async logout(
        @Req() req: Request,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>  {
      await this.authService.logout(String(user.userId));
      return SuccessResponseDto.of();
    }

}