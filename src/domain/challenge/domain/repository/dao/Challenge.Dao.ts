import { Injectable } from "@nestjs/common";
import { Challenge } from "../../entity/Challenge.js";
import { DataSource, Repository } from "typeorm";
import { ChallengeRepository } from "../Challenge.Repository.js";
import { ChallengeInformation } from "../../../dto/ChallengeInformation.js";
import { ChallengeDay } from "../../entity/ChallengeDay.js";
import { ChallengeDepositDeduction } from "../../entity/ChallengeDepositDeduction.js";


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

    async findChallengeWithCondition(challengeId: number): Promise<ChallengeInformation[]>{
        return this.dataSource
        .createQueryBuilder()
        .select([
            'c.challenge_id AS challengeId',
            'c.deposit AS deposit',
            'COUNT(cd.day) AS challengeDayCount',
            'cdd.start_count AS startCount',
            'cdd.end_count AS endCount',
            'cdd.deduction_amount AS deductionAmount',
        ])
        .from(Challenge, 'c')
        .innerJoin(ChallengeDay, 'cd', 'cd.challenge_id = c.challenge_id')
        .innerJoin(ChallengeDepositDeduction, 'cdd', 'cdd.challenge_id = c.challenge_id')
        .where('cd.day < CURDATE()')
        .andWhere('c.challenge_id = :challengeId', { challengeId })
        .groupBy('c.challenge_id, c.deposit, cdd.start_count, cdd.end_count, cdd.deduction_amount')
        .getRawMany();

    }


}