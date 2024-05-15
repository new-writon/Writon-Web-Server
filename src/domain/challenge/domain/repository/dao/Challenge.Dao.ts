import { Injectable } from "@nestjs/common";
import { Challenge } from "../../entity/Challenge.js";
import { DataSource, Repository } from "typeorm";
import { Period } from "../../../dto/response/Period.js";
import { ChallengeRepository } from "../Challenge.Repository.js";


@Injectable()
export class ChallengeDao extends Repository<Challenge> implements ChallengeRepository{

    constructor(private dataSource: DataSource) { super(Challenge, dataSource.createEntityManager()); }


    async findChallengeByIdAndOngoing(challengeId: number): Promise<Challenge[]>{
        return this.query(`
            SELECT *
            FROM Challenge as c
            WHERE c.challenge_id = ${challengeId}
            AND curdate() <= c.finish_at ;
        `)
    };


    async findOverlapPeriod(challengeId: number): Promise<number>{
        const data = await this.dataSource
            .createQueryBuilder()
            .select(`DATEDIFF(c.finish_at, NOW()) AS "period"`)
            .from(Challenge, 'c')
            .where('c.challenge_id = :challengeId',{challengeId:challengeId})
            .getRawOne();

        return data.period
    };


    async findChallengeById(challengeId: number): Promise<Challenge>{
        return this.findOne({
            where:{
                challenge_id: challengeId
            }
        })
    }


}