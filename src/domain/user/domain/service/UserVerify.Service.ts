import { Injectable } from "@nestjs/common";
import { UserChallenge } from "../entity/UserChallenge";
import { UserException } from "../../exception/UserException";
import { UserErrorCode } from "../../exception/UserErrorCode";
import { checkData } from "../../util/checker";
import { Affiliation } from "../entity/Affiliation";
import { User } from "../entity/User";

@Injectable()
export class UserVerifyService{

    public verifyUserChallenge(userChallenge:UserChallenge){
        if(!checkData(userChallenge))
            throw new UserException(UserErrorCode.NOT_FOUND_USERCHALLENGE);
    }

    public verifyAffiliation(affiliation:Affiliation){
        if(!checkData(affiliation))
            throw new UserException(UserErrorCode.NOT_FOUND_AFFILIATION);
    }

    /**
     * 
     * @param user 
     * @returns 유저 정보가 없을 시 에러를 터뜨린다.
     */
    public verifyUser(user:User){
        if(!checkData(user))     // 유저 정보가 없을 시 
            throw new UserException(UserErrorCode.NOT_FOUND_USER);  
    }


}