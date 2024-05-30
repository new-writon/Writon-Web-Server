import { Injectable } from "@nestjs/common";
import { UserChallenge } from "../entity/UserChallenge.js";
import { UserException } from "../../exception/UserException.js";
import { UserErrorCode } from "../../exception/UserErrorCode.js";
import { checkData } from "../../util/checker.js";

@Injectable()
export class UserChallengeVerifyService{

    public verifyUserChallenge(userChallenge:UserChallenge){
        if(!checkData(userChallenge))
            throw new UserException(UserErrorCode.NOT_FOUND_USERCHALLENGE);
    }
}