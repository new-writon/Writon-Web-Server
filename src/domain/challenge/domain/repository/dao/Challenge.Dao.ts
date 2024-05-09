import { Injectable } from "@nestjs/common";
import { Challenge } from "../../entity/Challenge.js";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class ChallengeDao extends Repository<Challenge> {

    constructor(private dataSource: DataSource) { super(Challenge, dataSource.createEntityManager()); }


    private async findChallengeById(challengeId: number): Promise<Challenge[]>{
        return this.query(`
            SELECT *
            FROM Challenge as c
            WHERE c.challenge_id = ${challengeId}
            AND curdate() <= c.finish_at ;
        `)
    };
}