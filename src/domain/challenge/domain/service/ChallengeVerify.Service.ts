import { Injectable } from "@nestjs/common";
import { Challenge } from "../entity/Challenge";
import { checkData } from "../../util/checker";
import { ChallengeException } from "../../exception/ChallengeException";
import { ChallengeErrorCode } from "../../exception/ChallengeErrorCode";



@Injectable()
export class ChallengeVerifyService{

    public verifyChallenge(challenge:Challenge){
        if(!checkData(challenge))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE);
    }
}