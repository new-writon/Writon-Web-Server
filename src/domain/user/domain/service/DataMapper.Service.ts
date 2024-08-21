import { Injectable } from "@nestjs/common";
import { UserChallenge } from "../entity/UserChallenge";

@Injectable()
export class DataMapperService{

    public extractUserChallengeIds(userChallenges:UserChallenge[]){
        return userChallenges.map((data)=> data.getId());
    }




}