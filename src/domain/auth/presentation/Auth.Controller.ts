import { Body, Controller, Delete, HttpCode, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AuthService } from "../service/Auth.Service.js";
import { KakaoLogin } from "../dto/request/KakaoLogin.js";
import { LoginResponse } from "../dto/response/loginResponse.js";
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { User } from "../../user/domain/entity/User.js";
import { LocalLogin } from "../dto/request/LocalLogin.js";
import { Request } from "express";



@Controller("/api/auth")
export class AuthController{
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly authService: AuthService) {}

    @Post("/login/kakao")
    @HttpCode(200)
    public async kakaoLogin(
        @Body() kakaoLogin: KakaoLogin,
        @Req() req: Request,
    ): Promise<SuccessResponseDto<LoginResponse>>  {
      const result : LoginResponse = await this.authService.kakaoLogin(kakaoLogin.getOrganization(), kakaoLogin.getChallengeId(), req.headers["authorization"]);
      this.logger.log("카카오 로그인 완료");
      return SuccessResponseDto.of(result);
    }

    @Post("/login/local")
    @HttpCode(200)
    public async localLogin(
        @Body() loginLocal: LocalLogin
    ): Promise<SuccessResponseDto<LoginResponse>>  {
     const result : LoginResponse = await this.authService.localLogin(loginLocal.getIdentifier(), loginLocal.getPassword() , loginLocal.getOrganization(), loginLocal.getChallengeId());
     this.logger.log("로컬 로그인 완료");
     return SuccessResponseDto.of(result);
    }


    @Delete("/logout")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async logout(
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>  {
      await this.authService.logout(String(user.user_id));
      this.logger.log("로그아웃 완료");
      return SuccessResponseDto.of();
    }
}