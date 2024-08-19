import { Injectable } from "@nestjs/common";
import { UserChallenge } from "../entity/UserChallenge";
import { UserException } from "../../exception/UserException";
import { UserErrorCode } from "../../exception/UserErrorCode";
import { checkData } from "../../util/checker";
import { Affiliation } from "../entity/Affiliation";

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


}