import { DataSource, Repository } from "typeorm";
import { AgoraRepository } from "../Agora.Repository.js";
import { Agora } from "../../entity/Agora.js";
import { Injectable } from "@nestjs/common";
import { AgoraComment } from "../../entity/AgoraComment.js";
import { ParticularAgoraData } from "../../../../agora/dto/ParticularAgoraData.js";


@Injectable()
export class AgoraDao extends Repository<Agora> implements AgoraRepository{

    constructor(private dataSource: DataSource) { super(Agora, dataSource.createEntityManager()); }

    async findAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>{
        const particularAgoraData :ParticularAgoraData[] = await this.dataSource.createQueryBuilder()
            .select([
                'ag.agora_id AS agoraId',
                'ag.question AS question',
                'COUNT(DISTINCT agc.affiliation_id) AS participateCount',
                "DATE_FORMAT(ag.createdAt, '%H:%i') AS createdTime",
                "DATE(ag.createdAt) AS createdDate",
                'ag.user_challenge_id AS user_challenge_id'
            ])
            .from(Agora, 'ag')
            .leftJoin(AgoraComment, 'agc', 'agc.agora_id = ag.agora_id')
            .where('DATE(ag.createdAt) = :date', { date })
            .andWhere('ag.challenge_id = :challengeId', { challengeId })
            .groupBy('ag.agora_id, ag.question, ag.createdAt, ag.user_challenge_id')
            .orderBy('ag.createdAt', 'DESC')
            .getRawMany();
    
        return particularAgoraData.map((data)=> new ParticularAgoraData(data.agoraId, data.question, data.participateCount, data.createdTime, data.createdDate, data.user_challenge_id))
        
        }
}
