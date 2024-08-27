import { DataSource, Repository } from "typeorm";
import { Satisfaction } from "../../entity/Satisfaction";
import { SatisfactionRepository } from "../Satisfaction.Repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SatisfactionDao extends Repository<Satisfaction> implements SatisfactionRepository{


    constructor(private dataSource: DataSource) { super(Satisfaction, dataSource.createEntityManager()); }

    async findSatisfactionByChallengeId(challengeId:number):Promise<Satisfaction[]>{
        return this.dataSource.createQueryBuilder()
            .select('s')
            .from(Satisfaction, 's')
            .where('s.challenge_id = :challengeId',{challengeId})
            .getMany();
    }

}