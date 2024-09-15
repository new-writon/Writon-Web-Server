import { Injectable } from "@nestjs/common";
import { checkData } from "../../util/checker";
import { AuthErrorCode } from "../../../../global/exception/auth/AuthErrorCode";
import { AuthException } from "../../../../global/exception/auth/AuthException";
import { User } from "src/domain/user/domain/entity/User";
import * as bcrypt from 'bcryptjs';



@Injectable()
export class AuthVerifyService{

    public verifyUser(user: User){
        if(!checkData(user))
            throw new AuthException(AuthErrorCode.NOT_VERIFY_EMAIL);
    }

    public verifyEmail(userData: User, email: string){
        if(userData.getEmail() !== email)
            throw new AuthException(AuthErrorCode.NOT_VERIFY_EMAIL);
    }

    /**
    * 
    * @param comparingPassword 비교할 패스워드
    * @param comparedPassword  비교 당할 패스워드
    * @returns 
    */
    public async verifyPassword(comparingPassword: string, comparedPassword: string){
        if (! await bcrypt.compare(comparingPassword, comparedPassword)) {
            throw new AuthException(AuthErrorCode.PASSWORD_IS_INCOREECT);
        }
    }


    public verifyCode(code: string, certifyCode: string){
        if (code !== certifyCode)
            throw new AuthException(AuthErrorCode.NOT_VERIFY_CODE);
    }
    
    public vefifyIdentifier(userData: User){
        if (!checkData(userData))
            throw new AuthException(AuthErrorCode.IDENTIFIER_IS_INCOREECT);
    }

    public signVerifyToken(accessTokenVerifyResult: boolean, refreshTokenVerifyesult: boolean){
        this.signVerifyAccessToken(accessTokenVerifyResult);
        this.signVerifyRefreshToken(refreshTokenVerifyesult);
    }

    public signVerifyAccessToken(status: boolean){
        if(status)
            throw new AuthException(AuthErrorCode.NOT_EXPIRED);
    }

    public signVerifyRefreshToken(status: boolean){
        if(!status)
            throw new AuthException(AuthErrorCode.LOGIN_AGAIN);           
    }

 
}