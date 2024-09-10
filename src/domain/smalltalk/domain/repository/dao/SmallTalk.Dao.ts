import { DataSource, Repository } from "typeorm";
import { SmallTalkRepository} from "../SmallTalk.Repository";
import { SmallTalk } from "../../entity/SmallTalk";
import { Injectable } from "@nestjs/common";
import { SmallTalkComment } from "../../entity/SmallTalkComment";
import { ParticularSmallTalkData } from "../../../dto/values/ParticularSmallTalkData";


@Injectable()
export class SmallTalkDao extends Repository<SmallTalk> implements SmallTalkRepository{

    constructor(private dataSource: DataSource) { super(SmallTalk, dataSource.createEntityManager()); }

    async findParticularSmallTalkByChallengeIdAndDate(challengeId:number, date:string):Promise<ParticularSmallTalkData[]>{
        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;
        const particularSmallTalkData: ParticularSmallTalkData[] = await this.dataSource.createQueryBuilder()
            .select([
                'st.small_talk_id AS smallTalkId',
                'st.question AS question',
                'COUNT(DISTINCT stc.affiliation_id) AS participateCount',
                "DATE_FORMAT(st.created_at, '%H:%i') AS createdTime",
                `'${date}' AS createdDate`,  
                'st.user_challenge_id AS userChallengeId'
            ])
            .from(SmallTalk, 'st')
            .leftJoin(SmallTalkComment, 'stc', 'stc.small_talk_id = st.small_talk_id')
            .where('st.created_at >= :startDate', { startDate })
            .andWhere('st.created_at <= :endDate', { endDate })
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
