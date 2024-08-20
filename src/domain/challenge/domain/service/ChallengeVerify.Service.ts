import { Injectable } from "@nestjs/common";
import { Challenge } from "../entity/Challenge";
import { checkData } from "../../util/checker";
import { ChallengeException } from "../../exception/ChallengeException";
import { ChallengeErrorCode } from "../../exception/ChallengeErrorCode";
import { ChallengeDay } from "../entity/ChallengeDay";



@Injectable()
export class ChallengeVerifyService{

    public verifyChallenge(challenge:Challenge){
        if(!checkData(challenge))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE);
    }


    public verifyChallengeDay(challengeDay : ChallengeDay){
        if(!checkData(challengeDay))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE_DAY);    
    }
}