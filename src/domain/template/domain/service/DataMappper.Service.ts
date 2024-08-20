import { Injectable } from "@nestjs/common";
import { Comment } from "../entity/Comment";




@Injectable()
export class DataMapperService{

    public extractUserChallengeId(comments:Comment[]):number[]{
        return comments.map((e) =>{
            return e.userTemplate.getUserChallengeId()
        })
    }

    public extractAffiliationId(commentDatas: Comment[]){
        return commentDatas.map((data)=>data.getAffiliationId());
    }
}