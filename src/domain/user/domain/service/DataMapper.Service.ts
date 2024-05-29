import { Injectable } from "@nestjs/common";
import { UserChallenge } from "../entity/UserChallenge";

@Injectable()
export class DataMapperService{

    public getUserChallengeId(userChallenge:UserChallenge[]){
        return userChallenge.map((data)=>{
            return data.getId()
        })
    }




}