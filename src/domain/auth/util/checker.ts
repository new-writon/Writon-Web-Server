import { User } from "../../user/domain/entity/User.js";
import { AuthErrorCode } from "../exception/AuthErrorCode.js";
import { AuthException } from "../exception/AuthException.js";
import bcrypt from 'bcrypt';


/**
* 
* @param data 
* @returns  데이터가 없을 경우 false 반환, 있을 경우 true 반환
*/
const checkData = (data: any): boolean => {
    let result = true
    if (!data) {   // 데이터가 없을 경우
        return result = false;
    }
    return result;
}

const verifyCode = (code: string, certifyCode: string) => {
    if (code !== certifyCode)
        throw new AuthException(AuthErrorCode.NOT_VERIFY_CODE);
}

const vefifyIdentifier = (userData: User) => {
    if (!checkData(userData))
        throw new AuthException(AuthErrorCode.IDENTIFIER_IS_INCOREECT);
}


/**
* 
* @param comparingPassword 비교할 패스워드
* @param comparedPassword  비교 당할 패스워드
* @returns 
*/
const verifyPassword = async (comparingPassword: string, comparedPassword: string) => {
    if (! await bcrypt.compare(comparingPassword, comparedPassword)) {
        throw new AuthException(AuthErrorCode.PASSWORD_IS_INCOREECT);
    }
}

export {
    checkData, verifyCode, vefifyIdentifier, verifyPassword
}