import { Injectable } from "@nestjs/common";
import { Challenge } from "../../entity/Challenge";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class ChallengeDao extends Repository<Challenge> {

    constructor(private dataSource: DataSource) { super(Challenge, dataSource.createEntityManager()); }
}