import { Injectable } from "@nestjs/common";
import { Comment } from "../entity/Comment";
import { UserTemplate } from "../entity/UserTemplate";




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


    public extractCompleteCount(userTemplates:UserTemplate[]){
        return userTemplates.map((userTemplate)=>userTemplate.getComplete()).length;
    }
    
    
    public extractQuestionId(userTemplate:UserTemplate){
        return userTemplate.getQuestionContents().map((data)=> data.getQuestionId())
    }

    public extractQuestionIds(userTemplates:UserTemplate[]){
        return userTemplates.flatMap((userTemplate)=>{
            return userTemplate.getQuestionContents().map((questionContent) =>
               questionContent.getQuestionId()
            )
        })
    }

    
}