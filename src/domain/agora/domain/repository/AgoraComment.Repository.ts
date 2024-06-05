import { Repository } from "typeorm";
import { AgoraComment } from "../entity/AgoraComment.js";




export interface AgoraCommentRepository extends Repository<AgoraComment>{

    insertAgoraComment(agoraId:number, affiliationId:number, agoraComment:string):Promise<void>;

}