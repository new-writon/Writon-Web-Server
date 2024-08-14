import { DataSource, Repository } from "typeorm";
import { SmallTalkComment } from "../../entity/SmallTalkComment.js";
import { SmallTalkCommentRepository } from "../SmallTalkComment.Repository.js";
import { Injectable } from "@nestjs/common";
import { ParticularSmallTalkCommentData } from "../../../dto/ParticularSmallTalkCommentData.js";


@Injectable()
export class SmallTalkCommentDao extends Repository<SmallTalkComment> implements SmallTalkCommentRepository{

    constructor(private dataSource: DataSource) { super(SmallTalkComment, dataSource.createEntityManager()); }

    async insertSmallTalkComment(smallTalkId:number, affiliationId:number, smallTalkComment:string):Promise<void>{
        const newAgoraComment = SmallTalkComment.createSmallTalkComment(smallTalkId, affiliationId, smallTalkComment);
        await this.save(newAgoraComment);
    }


    async findSmallTalkCommentByAgoraId(smallTalkId:number):Promise<ParticularSmallTalkCommentData[]>{
        const particularCommentData : ParticularSmallTalkCommentData[] = await this.dataSource.createQueryBuilder()
            .select([
                'agc.agora_comment_id AS agora_comment_id',
                'agc.content AS content',
                "TIME_FORMAT(agc.createdAt, '%H:%i') AS created_time",
                'agc.affiliation_id AS affiliation_id'
            ])
            .from(SmallTalkComment, 'agc')
            .where('agc.agora_id = :agoraId',{smallTalkId})
            .orderBy('agc.createdAt', 'ASC')
            .getRawMany();
        return particularCommentData.map((data) => new ParticularSmallTalkCommentData(data.smallTalkCommentId, data.content, data.created_time, data.affiliationId));
    }
}
