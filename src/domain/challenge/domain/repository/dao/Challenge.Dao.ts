import { Injectable } from "@nestjs/common";
import { Challenge } from "../../entity/Challenge";
import { DataSource, Repository } from "typeorm";
import { ChallengeRepository } from "../Challenge.Repository";
import { ChallengeInformation } from "../../../dto/values/ChallengeInformation";
import { ChallengeDay } from "../../entity/ChallengeDay";
import { ChallengeDepositDeduction } from "../../entity/ChallengeDepositDeduction";
import { ChallengesPerOrganization } from "../../../../user/dto/values/ChallengesPerOrganization";


@Injectable()
export class ChallengeDao extends Repository<Challenge> implements ChallengeRepository{

    constructor(private dataSource: DataSource) { super(Challenge, dataSource.createEntityManager()); }


    async findChallengeByIdAndOngoing(challengeId: number): Promise<Challenge[]>{
        return this.query(`
            SELECT *
            FROM challenges as c
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
                challengeId: challengeId
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
        .innerJoin(ChallengeDepositDeduction, 'cdd', 'cdd.challenge_id = c.challenge_id AND cd.day < CURDATE()')
        .andWhere('c.challenge_id = :challengeId', { challengeId })
        .groupBy('c.challenge_id, c.deposit, cdd.start_count, cdd.end_count, cdd.deduction_amount')
        .getRawMany();

    }

    async findChallengeByChallengeName(challenge:string):Promise<Challenge>{
        return this.findOne({
            where:{
                name:challenge
            }
        })
    }

    async findChallengeByOrgnizationIds(organizationIds:number[]):Promise<Challenge[]>{
        return this.dataSource.createQueryBuilder()
            .select('c')
            .from(Challenge, 'c')
            .where('c.organization_id IN (:...organizationIds)',{organizationIds})
            .getMany();
    }

    async findAllChallengingInformation():Promise<ChallengeAllInformation[]>{
        const results = await this.createQueryBuilder('c')
        .select([
          'c.challenge_id AS challengeId',
          'c.deposit AS deposit',
          'CONVERT(COUNT(cd.day), CHAR) AS challengeDayCount',
          'cdd.start_count AS startCount',
          'cdd.end_count AS endCount',
          'cdd.deduction_amount AS deductionAmount'
        ])
        .innerJoin(ChallengeDay, 'cd', 'cd.challenge_id = c.challenge_id AND cd.day < CURDATE()')
        .innerJoin(ChallengeDepositDeduction, 'cdd', 'cdd.challenge_id = c.challenge_id')
        .where('CURDATE() <= c.finish_at')
        .groupBy('c.challenge_id')
        .addGroupBy('c.deposit')
        .addGroupBy('cdd.start_count')
        .addGroupBy('cdd.end_count')
        .addGroupBy('cdd.deduction_amount')
        .getRawMany();
        return results.map((data)=> {return ChallengeAllInformation.of(data.challengeId, data.deposit, data.challengeDayCount, data.startCount, data.endCount, data.deductionAmout)});
    }


    async findChallengesByIds(challengeIds:number[]):Promise<ChallengesPerOrganization[]>{
        const result = await this.createQueryBuilder()
            .select([
                'c.challenge_id AS challengeId',
                'c.name AS challenge',
                "CASE WHEN c.finish_at < CURDATE() THEN '1' ELSE '0' END AS challengeFinishSign"
            ])
            .from(Challenge, 'c')
            .where('c.challenge_id IN (:...challengeIds)',{challengeIds})
            .getRawMany();
        return result.map((data)=>ChallengesPerOrganization.of(undefined, data.challengeId, data.challenge, data.challengeFinishSign, undefined, undefined))
    }


}