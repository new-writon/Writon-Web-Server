import {  Injectable } from "@nestjs/common";
import { JwtManager } from "../util/JwtManager";
import { TokenManager } from "../../../global/util/TokenManager";
import { AuthenticationCodeResponse } from "../dto/response/AuthenticationCodeResponse";
import random from "../util/random";
import { MailManager } from "../../../global/util/MailManager";
import { Token } from "../dto/response/Token";
import { AuthVerifyService } from "../domain/service/AuthVerify.Service";


@Injectable()
export class VerificationService{
    constructor(
        private readonly jwtManager: JwtManager,
        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager,
        private readonly authVerifyService: AuthVerifyService
    ) { }
    
    public async reissueToken(accessToken: string, refreshToken: string): Promise<Token>{
        const accessTokenVerifyResult = this.jwtManager.verify(accessToken.split('Bearer ')[1]);
        const accessTokenDecodedData = this.jwtManager.decode(accessToken.split('Bearer ')[1]);
        const refreshTokenVerifyesult = await this.jwtManager.refreshVerify(refreshToken.split('Bearer ')[1], accessTokenDecodedData.userId);
        this.authVerifyService.signVerifyToken(accessTokenVerifyResult.state, refreshTokenVerifyesult.state);
        const newAccessToken = this.jwtManager.makeAccessToken(accessTokenDecodedData.userId, accessTokenDecodedData.role);
        return Token.of(newAccessToken, refreshTokenVerifyesult.token);
    }

    public async issueAuthenticationCode(email: string): Promise<AuthenticationCodeResponse> {
        const verificationCode = random.generateRandom(100000, 999999);
        await this.tokenManager.setToken(email, String(verificationCode), 180000)
        await this.mailManager.sendCodeEmail(email, verificationCode);
        return AuthenticationCodeResponse.of(verificationCode);
    }

    public async verifyAuthenticationCode(email: string, code: string): Promise<void> {
        const authenticationCode: string = await this.tokenManager.getToken(email);
        this.authVerifyService.verifyCode(code, authenticationCode);
    }



}