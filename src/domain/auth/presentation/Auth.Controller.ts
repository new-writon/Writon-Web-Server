import { Body, Controller, Delete, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AuthService } from "../domain/service/Auth.Service.js";
import { KakaoLogin } from "../dto/KakaoLogin.js";
import { LoginResponse } from "../dto/loginResponse.js";
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { User } from "../../user/domain/entity/User.js";
import { LocalLogin } from "../dto/LocalLogin.js";
import { SiginUp } from "../dto/SignUp.js";

@Controller("/api/auth")
export class AuthController{


    constructor(private readonly authService: AuthService) {}

    
    @Post("/login/kakao")
    @HttpCode(200)
    public async kakaoLogin(
        @Body() kakaoLogin: KakaoLogin,
        @Req() req: Request,
    ): Promise<SuccessResponseDto<LoginResponse>>  {
  
      const result : LoginResponse = await this.authService.kakaoLogin(kakaoLogin.getOrganization(), kakaoLogin.getChallengeId(), req.headers["authorization"]);
      return SuccessResponseDto.of(result);
    }

    @Post("/login/local")
    @HttpCode(200)
    public async localLogin(
        @Body() loginLocal: LocalLogin
    ): Promise<SuccessResponseDto<LoginResponse>>  {

     const result : LoginResponse = await this.authService.localLogin(loginLocal.getIdentifier(), loginLocal.getPassword() , loginLocal.getOrganization(), loginLocal.getChallengeId());
     return SuccessResponseDto.of(result);
    }

    @Post("/signup")
    @HttpCode(200)
    public async signUp(
        @Body() signUp: SiginUp
    ): Promise<SuccessResponseDto<void>>  {

     await this.authService.signUp(signUp.geIdentifier(), signUp.getPassword(), signUp.getEmail());
     return SuccessResponseDto.of();
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