import { DataSource, Repository } from "typeorm";
import { SmallTalkRepository} from "../SmallTalk.Repository.js";
import { SmallTalk } from "../../entity/SmallTalk.js";
import { Injectable } from "@nestjs/common";
import { SmallTalkComment } from "../../entity/SmallTalkComment.js";
import { ParticularSmallTalkData } from "../../../dto/ParticularSmallTalkData.js";


@Injectable()
export class SmallTalkDao extends Repository<SmallTalk> implements SmallTalkRepository{

    constructor(private dataSource: DataSource) { super(SmallTalk, dataSource.createEntityManager()); }

    async findParticularSmallTalkByChallengeIdAndDate(challengeId:number, date:Date):Promise<ParticularSmallTalkData[]>{
        const particularSmallTalkData :ParticularSmallTalkData[] = await this.dataSource.createQueryBuilder()
            .select([
                'st.small_talk_id AS smallTalkId',
                'st.question AS question',
                'COUNT(DISTINCT stc.affiliation_id) AS participateCount',
                "DATE_FORMAT(st.created_at, '%H:%i') AS createdTime",
                "DATE(st.created_at) AS createdDate",
                'st.user_challenge_id AS userChallengeId'
            ])
            .from(SmallTalk, 'st')
            .leftJoin(SmallTalkComment, 'stc', 'stc.small_talk_id = st.small_talk_id')
            .where('DATE(st.created_at) = :date', { date })
            .andWhere('st.challenge_id = :challengeId', { challengeId })
            .groupBy('st.small_talk_id, st.question, st.created_at, st.user_challenge_id')
            .orderBy('st.created_at', 'DESC')
            .getRawMany();
    
        return particularSmallTalkData.map((data)=> new ParticularSmallTalkData(data.smallTalkId, data.question, data.participateCount, data.createdTime, data.createdDate, data.userChallengeId))
        
        }

    async insertSmallTalk(challengeId: number, userChallengeId: number, question:string):Promise<void>{
        const newSmallTalk = SmallTalk.createSmallTalk(challengeId, userChallengeId, question);
        await this.save(newSmallTalk);
    }
    

    async findSmallTalkByChallengeIdAndDate(challengeId:number, date:string):Promise<SmallTalk[]>{
        return this.dataSource.createQueryBuilder()
        .select('st')
        .from(SmallTalk, 'st')
        .where('DATE(st.created_at) = :date', { date })
        .andWhere('st.challenge_id = :challengeId', { challengeId })
        .getMany()
    }
}
