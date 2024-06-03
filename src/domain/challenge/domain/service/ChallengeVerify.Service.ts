import { Injectable } from "@nestjs/common";
import { Challenge } from "../entity/Challenge.js";
import { checkData } from "../../util/checker.js";
import { ChallengeException } from "../../exception/ChallengeException.js";
import { ChallengeErrorCode } from "../../exception/ChallengeErrorCode.js";



@Injectable()
export class ChallengeVerifyService{

    public verifyChallenge(challenge:Challenge){
        if(!checkData(challenge))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE);
    }
}