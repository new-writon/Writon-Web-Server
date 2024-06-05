import { Repository } from "typeorm";
import { AgoraComment } from "../entity/AgoraComment.js";




export interface AgoraCommentRepository extends Repository<AgoraComment>{

}