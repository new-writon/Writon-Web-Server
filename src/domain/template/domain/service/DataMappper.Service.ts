import { Injectable } from "@nestjs/common";
import { Comment } from "../entity/Comment";



@Injectable()
export class DataMapperService{

    public getUserChallengeIdMapper(comments:Comment[]):number[]{
        return comments.map((e) =>{
            return e.userTemplete.getUserChallengeId()
        })
    }

}