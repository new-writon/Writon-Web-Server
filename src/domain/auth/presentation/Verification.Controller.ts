
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto";
import { AuthenticationCodeRequest } from "../dto/request/AuthenticationCodeRequest";
import { Body, Controller,  HttpCode,  Logger,  Post, Req} from "@nestjs/common";
import { AuthenticationCodeResponse } from "../dto/response/AuthenticationCodeResponse";
import { VerifyAuthenticationCode } from "../dto/request/VerifyAuthenticationCode";
import { Token } from "../dto/response/Token";
import { Request } from "express";
import { VerificationService } from "../service/Verifiaction.Service";

@Controller("/api/auth/verification")
export class VerificationController{
    private readonly logger = new Logger(VerificationController.name);
    constructor(private readonly verificationService: VerificationService) {}

    @Post("/email-code")
    @HttpCode(200)
    public async issueAuthenticationCode(
        @Body() auththenticationCode: AuthenticationCodeRequest
    ): Promise<SuccessResponseDto<AuthenticationCodeResponse>> {
      const result = await this.verificationService.issueAuthenticationCode(auththenticationCode.getEmail());
      this.logger.log("인증코드 발급 완료");
      return SuccessResponseDto.of(result);
    }

    @Post("/email-code/verify")
    @HttpCode(200)
    public async verifyAuthenticationCode(
        @Body() auththenticationCode: VerifyAuthenticationCode
    ): Promise<SuccessResponseDto<void>> {
      await this.verificationService.verifyAuthenticationCode(auththenticationCode.getEmail(), auththenticationCode.getCode());
      this.logger.log("인증코드 검증 완료");
      return SuccessResponseDto.of();
    }

    @Post("/token-reissue")
    @HttpCode(200)
    public async reissueToken(
      @Req() req: Request
    ): Promise<SuccessResponseDto<Token>> {
      const accessToken = req.headers.authorization;
      const refreshToken = req.headers.refresh as string;
      const result = await this.verificationService.reissueToken(accessToken, refreshToken);
      this.logger.log("토큰 재발급 완료");
      return SuccessResponseDto.of(result);
    }
}