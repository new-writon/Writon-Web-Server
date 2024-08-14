import { Injectable } from "@nestjs/common";
import { Comment } from "../entity/Comment.js";
import { Affiliation } from "../../../user/domain/entity/Affiliation.js";
import { MyComment } from "../../dto/response/MyComment.js";
import { checkData } from "../../util/checker.js";



@Injectable()
export class DataMapperService{

    public getUserChallengeIdMapper(comments:Comment[]):number[]{
        return comments.map((e) =>{
            return e.userTemplate.getUserChallengeId()
        })
    }

    public makeMyCommentMapper(affiliationData:Affiliation[], commentData:Comment[]){
        return commentData.map((comment)=>{
            const affiliation = affiliationData.find((affiliation) => affiliation.userChallenges[0].getId() === comment.userTemplate.getUserChallengeId());
            if(checkData(affiliation)){
                return new MyComment(comment.getId(), comment.getCreatedAt(), comment.getContent(), comment.userTemplate.getTemplateDate(), affiliation.getNickname(), comment.getUserTemplateId());
            }         
        })
    } 
    


}