import { DataSource, Repository } from "typeorm";
import { SmallTalkComment } from "../../entity/SmallTalkComment.js";
import { SmallTalkCommentRepository } from "../SmallTalkComment.Repository.js";
import { Injectable } from "@nestjs/common";
import { ParticularAgoraCommentData } from "../../../dto/ParticularAgoraCommentData.js";


@Injectable()
export class AgoraCommentDao extends Repository<SmallTalkComment> implements SmallTalkCommentRepository{

    constructor(private dataSource: DataSource) { super(SmallTalkComment, dataSource.createEntityManager()); }

    async insertAgoraComment(agoraId:number, affiliationId:number, agoraComment:string):Promise<void>{
        const newAgoraComment = SmallTalkComment.createSmallTalkComment(agoraId, affiliationId, agoraComment);
        await this.save(newAgoraComment);
    }


    async findAgoraCommentByAgoraId(agoraId:number):Promise<ParticularAgoraCommentData[]>{
        const particularCommentData : ParticularAgoraCommentData[] = await this.dataSource.createQueryBuilder()
            .select([
                'agc.agora_comment_id AS agora_comment_id',
                'agc.content AS content',
                "TIME_FORMAT(agc.createdAt, '%H:%i') AS created_time",
                'agc.affiliation_id AS affiliation_id'
            ])
            .from(SmallTalkComment, 'agc')
            .where('agc.agora_id = :agoraId',{agoraId})
            .orderBy('agc.createdAt', 'ASC')
            .getRawMany();
        return particularCommentData.map((data) => new ParticularAgoraCommentData(data.agora_comment_id, data.content, data.created_time, data.affiliation_id));
    }
}
