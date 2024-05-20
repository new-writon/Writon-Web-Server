import {  Injectable } from "@nestjs/common";
import { JwtManager } from "../util/JwtManager.js";
import { TokenManager } from "../../../global/util/TokenManager.js";
import { AuthException } from "../exception/AuthException.js";
import { AuthErrorCode } from "../exception/AuthErrorCode.js";
import { AuthenticationCodeResponse } from "../dto/response/AuthenticationCodeResponse.js";
import random from "../util/random.js";
import { MailManager } from "../../../global/util/MailManager.js";
import { Token } from "../dto/response/Token.js";
import { verifyCode } from "../util/checker.js";

@Injectable()
export class VerificationService{
    constructor(

        private readonly jwtManager: JwtManager,
        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager,

    ) { }
    
    public async reissueToken(accessToken: string, refreshToken: string): Promise<Token>{

        const accessTokenVerifyResult = this.jwtManager.verify(accessToken.split('Bearer ')[1]);
        const accessTokenDecodedData = this.jwtManager.decode(accessToken.split('Bearer ')[1]);
        const refreshTokenVerifyesult = await this.jwtManager.refreshVerify(refreshToken.split('Bearer ')[1], accessTokenDecodedData.userId);
        this.signVerifyToken(accessTokenVerifyResult.state, refreshTokenVerifyesult.state);
        const newAccessToken = this.jwtManager.makeAccessToken(accessTokenDecodedData.userId, accessTokenDecodedData.role);
        return Token.of(newAccessToken, refreshTokenVerifyesult.token);
    }

    public async issueAuthenticationCode(email: string): Promise<AuthenticationCodeResponse> {
        const verificationCode = random.generateRandom(100000, 999999);
        await this.tokenManager.setTimeoutToken(email, String(verificationCode), 180000)
        await this.mailManager.sendCodeEmail(email, verificationCode);
        return AuthenticationCodeResponse.of(verificationCode);
    }

    public async verifyAuthenticationCode(email: string, code: string): Promise<void> {

        const authenticationCode: string = await this.tokenManager.getToken(email);
        verifyCode(code, authenticationCode);
    }


    private signVerifyToken(accessTokenVerifyResult: boolean, refreshTokenVerifyesult: boolean){
        this.signVerifyAccessToken(accessTokenVerifyResult);
        this.signVerifyRefreshToken(refreshTokenVerifyesult);
    }

    private signVerifyAccessToken(status: boolean){
        if(status)
            throw new AuthException(AuthErrorCode.NOT_EXPIRED);
    }

    private signVerifyRefreshToken(status: boolean){
        if(!status)
            throw new AuthException(AuthErrorCode.LOGIN_AGAIN);           
    }

}