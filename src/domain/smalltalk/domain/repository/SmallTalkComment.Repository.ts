import { Repository } from "typeorm";
import { SmallTalkComment } from "../entity/SmallTalkComment.js";
import { ParticularAgoraCommentData } from "../../dto/ParticularAgoraCommentData.js";




export interface SmallTalkCommentRepository extends Repository<SmallTalkComment>{

    insertAgoraComment(agoraId:number, affiliationId:number, agoraComment:string):Promise<void>;
    findAgoraCommentByAgoraId(agoraId:number):Promise<ParticularAgoraCommentData[]>;

}