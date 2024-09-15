import { Injectable } from "@nestjs/common";
import { Challenge } from "../../../domain/challenge/domain/entity/Challenge";
import { ChallengeException } from "./ChallengeException";
import { checkData } from "../../../domain/auth/util/checker";
import { ChallengeErrorCode } from "./ChallengeErrorCode";
import { ChallengeDay } from "../../../domain/challenge/domain/entity/ChallengeDay";
import { BasicQuestion } from "../../../domain/challenge/dto/response/BasicQuestion";
import { SpecialQuestion } from "../../../domain/challenge/dto/response/SpecialQuestion";
import { Question } from "../../../domain/challenge/domain/entity/Question";



@Injectable()
export class ChallengeVerifyService{

    public verifyChallenge(challenge:Challenge){
        if(!checkData(challenge))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE);
    }

    public verifyChallenges(challenges:Challenge[]){
        if(!checkData(challenges[0]))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE);
    }

    public verifyChallengeDays(challengeDays: ChallengeDay[]){
        if(!checkData(challengeDays))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE_DAY);    
    }

    public verifyChallengeDay(challengeDay : ChallengeDay){
        if(!checkData(challengeDay))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_CHALLENGE_DAY);    
    }

    public verifyBasicQuestion(question:BasicQuestion[]){
        if(!checkData(question[0]))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_BASIC_QUESTION);    
    }

    public verifySpecialQuestion(question:SpecialQuestion[]){
        if(!checkData(question[0]))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_SPECIAL_QUESTION);    
    }

    public verifyQuestion(question:Question[]){
        if(!checkData(question[0]))
            throw new ChallengeException(ChallengeErrorCode.NOT_FOUND_QUESTION);    
    }
}