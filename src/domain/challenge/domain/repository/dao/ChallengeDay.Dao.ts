import { Injectable } from "@nestjs/common";

import { DataSource, Repository } from "typeorm";
import { ChallengeDay } from "../../entity/ChallengeDay.js";
import { ChallengeDayRepository } from "../ChallengeDay.Repository.js";


@Injectable()
export class ChallengeDayDao extends Repository<ChallengeDay> implements ChallengeDayRepository{

    constructor(private dataSource: DataSource) { super(ChallengeDay, dataSource.createEntityManager());}


    async findChallengeDayByChallengeIdAndDate(challengeId:number, date:Date):Promise<ChallengeDay>{
        return this.findOneBy({
             challengeId: challengeId,
             day: date
        })
    };


    async findChallengeOverlapCount(challengeId: number): Promise<number>{
        return this.dataSource
            .createQueryBuilder()
            .select()
            .from(ChallengeDay, 'cd')
            .where('cd.challenge_id = :challengeId', {challengeId:challengeId})
            .getCount()
    };

    async findChallengeDayByChallengeId(challengeId: number): Promise<ChallengeDay[]>{
        return this.dataSource
            .createQueryBuilder()
            .select('cd')
            .from(ChallengeDay, 'cd')
            .where('cd.challenge_id= :challengeId', {challengeId:challengeId})
            .andWhere('cd.day BETWEEN (SELECT c.start_at FROM Challenge as c WHERE c.challenge_id = :challengeId) AND CURDATE()')
            .getMany()
    }
}