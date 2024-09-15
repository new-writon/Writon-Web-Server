import { Injectable } from "@nestjs/common";
import { checkData } from "../../../domain/auth/util/checker";
import { UserChallenge } from "../../../domain/user/domain/entity/UserChallenge";
import { UserException } from "./UserException";
import { UserErrorCode } from "./UserErrorCode";
import { Affiliation } from "../../../domain/user/domain/entity/Affiliation";
import { Organization } from "../../../domain/user/domain/entity/Organization";
import { User } from "../../../domain/user/domain/entity/User";


@Injectable()
export class UserVerifyService{

    public verifyUserChallenge(userChallenge:UserChallenge){
        if(!checkData(userChallenge))
            throw new UserException(UserErrorCode.NOT_FOUND_USERCHALLENGE);
    }

    public verifyUserChallenges(userChallenges:UserChallenge[]){
        if(!checkData(userChallenges))
            throw new UserException(UserErrorCode.NOT_FOUND_USERCHALLENGE);
    }

    public verifyExistUserChallenge(userChallenge:UserChallenge){
        if(checkData(userChallenge))
            throw new UserException(UserErrorCode.ALREADY_EXIST_USERCHALLENGE);
    }

    public verifyAffiliation(affiliation:Affiliation){
        if(!checkData(affiliation))
            throw new UserException(UserErrorCode.NOT_FOUND_AFFILIATION);
    }

    public verifyExistAffiliation(affiliation:Affiliation){
        if(checkData(affiliation))
            throw new UserException(UserErrorCode.ALREADY_EXIST_AFFILIATION)
    }

    public verifyAffiliations(affiliations:Affiliation[]){
        if(!checkData(affiliations))
            throw new UserException(UserErrorCode.NOT_FOUND_AFFILIATION);
    }

    public verifyOrganization(organization:Organization){
        if(!checkData(organization))
            throw new UserException(UserErrorCode.NOT_FOUND_ORGANIZATION);
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