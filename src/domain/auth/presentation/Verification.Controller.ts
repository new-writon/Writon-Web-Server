
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { AuthenticationCodeRequest } from "../dto/request/AuthenticationCodeRequest.js";
import { Body, Controller,  HttpCode,  Post, Req} from "@nestjs/common";
import { AuthenticationCodeResponse } from "../dto/response/AuthenticationCodeResponse.js";
import { VerifyAuthenticationCode } from "../dto/request/VerifyAuthenticationCode.js";
import { Token } from "../dto/response/Token.js";
import { Request } from "express";
import { VerificationService } from "../service/Verifiaction.Service.js";

@Controller("/api/auth/verification")
export class VerificationController{

    constructor(private readonly verificationService: VerificationService) {}



    @Post("/email-code")
    @HttpCode(200)
    public async issueAuthenticationCode(
        @Body() auththenticationCode: AuthenticationCodeRequest

    ): Promise<SuccessResponseDto<AuthenticationCodeResponse>> {
      const result = await this.verificationService.issueAuthenticationCode(auththenticationCode.getEmail());
      return SuccessResponseDto.of(result);
    }

    @Post("/email-code/verify")
    @HttpCode(200)
    public async verifyAuthenticationCode(
        @Body() auththenticationCode: VerifyAuthenticationCode

    ): Promise<SuccessResponseDto<void>> {
      await this.verificationService.verifyAuthenticationCode(auththenticationCode.getEmail(), auththenticationCode.getCode());
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
      return SuccessResponseDto.of(result);
    }

}