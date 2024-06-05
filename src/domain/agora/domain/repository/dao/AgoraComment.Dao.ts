import { Repository } from "typeorm";
import { AgoraComment } from "../../entity/AgoraComment.js";
import { AgoraCommentRepository } from "../AgoraComment.Repository.js";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AgoraCommentDao extends Repository<AgoraComment> implements AgoraCommentRepository{
    
}
