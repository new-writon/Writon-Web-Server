import { Injectable } from "@nestjs/common";

import { DataSource, Repository } from "typeorm";
import { ChallengeDay } from "../../entity/ChallengeDay.js";


@Injectable()
export class ChallengeDayDao extends Repository<ChallengeDay> {

    constructor(private dataSource: DataSource) { super(ChallengeDay, dataSource.createEntityManager());}


    private async findChallengeDayByChallengeIdAndDate(challengeId:number, date:Date):Promise<ChallengeDay>{
        return this.findOneBy({
             challenge_id: challengeId,
             day: date
        })
    };


    private async findOverlapCount(challengeId: number): Promise<number>{
        return this.dataSource
            .createQueryBuilder()
            .select()
            .from(ChallengeDay, 'cd')
            .where('cd.challenge_id = :challengeId', {challengeId:challengeId})
            .getCount()
    };

    private async findChallengeDayByChallengeId(challengeId: number): Promise<ChallengeDay[]>{
        return this.dataSource
            .createQueryBuilder()
            .select('cd')
            .from(ChallengeDay, 'cd')
            .where('cd.challenge_id= :challengeId', {challengeId:challengeId})
            .andWhere('cd.day BETWEEN (SELECT c.start_at FROM Challenge as c WHERE c.challenge_id = :challengeId) AND CURDATE()')
            .getMany()
    }
}