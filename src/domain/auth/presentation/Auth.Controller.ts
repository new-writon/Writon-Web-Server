import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AuthService } from "../service/Auth.Service.js";
import { KakaoLogin } from "../dto/request/KakaoLogin.js";
import { LoginResponse } from "../dto/response/loginResponse.js";
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { User } from "../../user/domain/entity/User.js";
import { LocalLogin } from "../dto/request/LocalLogin.js";
import { SiginUp } from "../dto/request/SignUp.js";
import { AuthenticationCodeResponse } from "../dto/response/AuthenticationCodeResponse.js";
import { AuthenticationCodeRequest } from "../dto/request/AuthenticationCodeRequest.js";
import { VerifyAuthenticationCode } from "../dto/request/VerifyAuthenticationCode.js";
import { Token } from "../dto/response/Token.js";
import { Request } from "express";
import { TemporaryPassword } from "../dto/request/TemporaryPassword.js";
import { PasswordChange } from "../dto/request/PasswordChange.js";
import { UserIdentifier } from "../dto/response/UserIdentifier.js";


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
    public async localSignUp(
        @Body() signUp: SiginUp
    ): Promise<SuccessResponseDto<void>>  {

     await this.authService.localSignUp(signUp.geIdentifier(), signUp.getPassword(), signUp.getEmail());
     return SuccessResponseDto.of();
    }


    @Delete("/logout")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async logout(
        @Req() req: Request,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>  {
      await this.authService.logout(String(user.user_id));
      return SuccessResponseDto.of();
    }


    @Post("/generate/email-code")
    @HttpCode(200)
    public async issueAuthenticationCode(
        @Body() auththenticationCode: AuthenticationCodeRequest

    ): Promise<SuccessResponseDto<AuthenticationCodeResponse>> {
      const result = await this.authService.issueAuthenticationCode(auththenticationCode.getEmail());
      return SuccessResponseDto.of(result);
    }

    @Post("/verify/email-code")
    @HttpCode(200)
    public async verifyAuthenticationCode(
        @Body() auththenticationCode: VerifyAuthenticationCode

    ): Promise<SuccessResponseDto<void>> {
      await this.authService.verifyAuthenticationCode(auththenticationCode.getEmail(), auththenticationCode.getCode());
      return SuccessResponseDto.of();
    }


    @Post("/token-reissue")
    @HttpCode(200)
    public async reissueToken(
      @Req() req: Request
    ): Promise<SuccessResponseDto<Token>> {
      const accessToken = req.headers.authorization;
      const refreshToken = req.headers.refresh as string;
      const result = await this.authService.reissueToken(accessToken, refreshToken);
      return SuccessResponseDto.of(result);
    }

    @Get("/identifier/check")
    @HttpCode(200)
    public async checkDuplicateIdentifier(
      @Query("identifier") identifier: string
    ): Promise<SuccessResponseDto<void>>  {
  
      await this.authService.checkDuplicateIdentifier(identifier);
      return SuccessResponseDto.of();
    }
  
  
  
    @Get("/email/check")
    @HttpCode(200)
    public async checkDuplicateEmail(
      @Query("email") email: string
    ): Promise<SuccessResponseDto<void>>  {
  
      await this.authService.checkDuplicateEmail(email);
      return SuccessResponseDto.of();
    }
    
  
    @Get("/idenfitier/find")
    @HttpCode(200)
    public async findIdentifier(
      @Query("email") email: string,
      @Query("code") code: string
    ): Promise<SuccessResponseDto<UserIdentifier>>  {
  
      const result : UserIdentifier = await this.authService.findIdentifier(email, code);
      return SuccessResponseDto.of(result);
    }
  
  
    @Patch("/temporary-password/generate")
    @HttpCode(200)
    public async generateTemporaryPassword(
      @Body() temporaryPassword: TemporaryPassword
    ): Promise<SuccessResponseDto<void>>  {
  
      await this.authService.generateTemporaryPassword(temporaryPassword.getIdentifier(), temporaryPassword.getEmail());
      return SuccessResponseDto.of();
    }
  
  
  
    @Patch("/password/change")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async changePassword(
      @Body() passwordChange: PasswordChange,
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>  {
  
      await this.authService.changePassword(user.user_id, passwordChange.getOldPassword(), passwordChange.getNewPassword());
      return SuccessResponseDto.of();
    }



}