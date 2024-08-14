import { Repository } from "typeorm";
import { SmallTalkComment } from "../entity/SmallTalkComment.js";
import { ParticularSmallTalkCommentData } from "../../dto/ParticularSmallTalkCommentData.js";




export interface SmallTalkCommentRepository extends Repository<SmallTalkComment>{

    insertSmallTalkComment(smallTalkId:number, affiliationId:number, smallTalkComment:string):Promise<void>;
    findSmallTalkCommentBySmallTalkId(smallTalkId:number):Promise<ParticularSmallTalkCommentData[]>;

}