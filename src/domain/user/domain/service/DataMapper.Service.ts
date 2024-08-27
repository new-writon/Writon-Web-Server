import { Injectable } from "@nestjs/common";
import { UserChallenge } from "../entity/UserChallenge";
import { ChallengesPerOrganization } from "../../dto/values/ChallengesPerOrganization";

@Injectable()
export class DataMapperService{

    public extractUserChallengeIds(userChallenges:UserChallenge[]){
        return userChallenges.map((data)=> data.getId());
    }


    public extractChallengeIds(challengesPerOrganizations:ChallengesPerOrganization[]){
        return challengesPerOrganizations.map((data)=> data.getChallengeId());
    }




}