import { Body, Controller, Delete, HttpCode, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto";
import { AuthService } from "../service/Auth.Service";
import { KakaoLogin } from "../dto/request/KakaoLogin";
import { LoginResponse } from "../dto/response/loginResponse";
import { CurrentUser } from '../../auth/decorators/Auth.Decorator';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard';
import { User } from "../../user/domain/entity/User";
import { LocalLogin } from "../dto/request/LocalLogin";
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
      const result : LoginResponse = await this.authService.kakaoLogin(kakaoLogin.getOrganization(), kakaoLogin.getChallengeId(), req.headers["authorization"], req.headers['engine'] as string);
      this.logger.log("카카오 로그인 완료");
      return SuccessResponseDto.of(result);
    }

    @Post("/login/local")
    @HttpCode(200)
    public async localLogin(
        @Body() loginLocal: LocalLogin,
        @Req() req: Request
    ): Promise<SuccessResponseDto<LoginResponse>>  {
     const result : LoginResponse = await this.authService.localLogin(loginLocal, req.headers['engine'] as string);
     this.logger.log("로컬 로그인 완료");
     return SuccessResponseDto.of(result);
    }

    @Delete("/logout")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async logout(
        @CurrentUser() user: User,
        @Req() req:Request
    ): Promise<SuccessResponseDto<void>>  {
      await this.authService.logout(String(user.userId), req.headers.refresh as string, req.headers['engineValue'] as string);
      this.logger.log("로그아웃 완료");
      return SuccessResponseDto.of();
    }
}