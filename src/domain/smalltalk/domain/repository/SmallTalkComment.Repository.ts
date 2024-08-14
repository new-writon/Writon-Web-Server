import { Repository } from "typeorm";
import { SmallTalkComment } from "../entity/SmallTalkComment.js";
import { ParticularSmallTalkCommentData } from "../../dto/ParticularSmallTalkCommentData.js";




export interface SmallTalkCommentRepository extends Repository<SmallTalkComment>{

    insertSmallTalkComment(smallTalkId:number, affiliationId:number, smallTalkIComment:string):Promise<void>;
    findSmallTalkCommentByAgoraId(smallTalkIId:number):Promise<ParticularSmallTalkCommentData[]>;

}