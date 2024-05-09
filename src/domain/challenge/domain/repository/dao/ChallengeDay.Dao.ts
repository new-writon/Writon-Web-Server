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
    }
}