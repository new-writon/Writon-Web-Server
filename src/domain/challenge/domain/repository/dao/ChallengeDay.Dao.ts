import { Injectable } from "@nestjs/common";
import { Challenge } from "../../entity/Challenge";
import { DataSource, Repository } from "typeorm";
import { ChallengeDay } from "../../entity/ChallengeDay";


@Injectable()
export class ChallengeDayDao extends Repository<ChallengeDay> {

    constructor(private dataSource: DataSource) { super(ChallengeDay, dataSource.createEntityManager());}


    private async findChallengeDayByChallengeIdAndDate(challengeId:number, date:Date):Promise<ChallengeDay>{
        return this.findOneBy({
             challengeId: challengeId,
             day: date
        })
    }
}