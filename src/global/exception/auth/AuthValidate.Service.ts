import { Injectable } from "@nestjs/common";
import { checkData } from "../../../domain/auth/util/checker";
import { User } from "src/domain/user/domain/entity/User";
import { AuthException } from "./AuthException";
import { AuthErrorCode } from "./AuthErrorCode";
import { Affiliation } from "../../../domain/user/domain/entity/Affiliation";



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