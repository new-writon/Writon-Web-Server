import { DataSource, Repository } from "typeorm";
import { AgoraComment } from "../../entity/AgoraComment.js";
import { AgoraCommentRepository } from "../AgoraComment.Repository.js";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AgoraCommentDao extends Repository<AgoraComment> implements AgoraCommentRepository{

    constructor(private dataSource: DataSource) { super(AgoraComment, dataSource.createEntityManager()); }

    async insertAgoraComment(agoraId:number, affiliationId:number, agoraComment:string):Promise<void>{
        const newAgoraComment = AgoraComment.createAgoraComment(agoraId, affiliationId, agoraComment);
        await this.save(newAgoraComment);
    }
}
