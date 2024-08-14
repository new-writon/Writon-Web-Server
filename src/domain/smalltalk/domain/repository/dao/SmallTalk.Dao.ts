import { DataSource, Repository } from "typeorm";
import { SmallTalkRepository} from "../SmallTalk.Repository.js";
import { SmallTalk } from "../../entity/SmallTalk.js";
import { Injectable } from "@nestjs/common";
import { SmallTalkComment } from "../../entity/SmallTalkComment.js";
import { ParticularAgoraData } from "../../../dto/ParticularAgoraData.js";


@Injectable()
export class AgoraDao extends Repository<SmallTalk> implements SmallTalkRepository{

    constructor(private dataSource: DataSource) { super(SmallTalk, dataSource.createEntityManager()); }

    async findParticularAgoraByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularAgoraData[]>{
        const particularAgoraData :ParticularAgoraData[] = await this.dataSource.createQueryBuilder()
            .select([
                'ag.agora_id AS agoraId',
                'ag.question AS question',
                'COUNT(DISTINCT agc.affiliation_id) AS participateCount',
                "DATE_FORMAT(ag.createdAt, '%H:%i') AS createdTime",
                "DATE(ag.createdAt) AS createdDate",
                'ag.user_challenge_id AS user_challenge_id'
            ])
            .from(SmallTalk, 'ag')
            .leftJoin(SmallTalkComment, 'agc', 'agc.agora_id = ag.agora_id')
            .where('DATE(ag.createdAt) = :date', { date })
            .andWhere('ag.challenge_id = :challengeId', { challengeId })
            .groupBy('ag.agora_id, ag.question, ag.createdAt, ag.user_challenge_id')
            .orderBy('ag.createdAt', 'DESC')
            .getRawMany();
    
        return particularAgoraData.map((data)=> new ParticularAgoraData(data.agoraId, data.question, data.participateCount, data.createdTime, data.createdDate, data.user_challenge_id))
        
        }

    async insertAgora(challengeId: number, userChallengeId: number, question:string):Promise<void>{
        const newAgora = SmallTalk.createSmallTalk(challengeId, userChallengeId, question);
        await this.save(newAgora);
    }
    

    async findAgoraByChallengeIdAndDate(challengeId:number, date:string):Promise<SmallTalk[]>{
        return this.dataSource.createQueryBuilder()
        .select('ag')
        .from(SmallTalk, 'ag')
        .where('DATE(ag.createdAt) = :date', { date })
        .andWhere('ag.challenge_id = :challengeId', { challengeId })
        .getMany()
    }
}
