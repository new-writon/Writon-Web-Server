import { Injectable } from "@nestjs/common";
import { checkData } from "../../util/checker";
import { AuthErrorCode } from "../../../../global/exception/auth/AuthErrorCode";
import { AuthException } from "../../../../global/exception/auth/AuthException";
import { User } from "src/domain/user/domain/entity/User";
import { Affiliation } from "../../../../domain/user/domain/entity/Affiliation";


@Injectable()
export class AuthValidateService{

    public validateIdentifier(userData: User){
        if(checkData(userData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_IDENTIFIER);
        }
    }

    public validateEmail(userData: User){
        if(checkData(userData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_EMAIL);
        }
    }

    public validateNickname(affiliationData: Affiliation){
        if(checkData(affiliationData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_NICKNAME);
        }
    }
}