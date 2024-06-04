import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SatisfactionSubjectiveResultRepository } from "../SatisfactionSubjectiveResult.Repository.js";
import { SatisfactionSubjectiveResult } from "../../entity/SatisfactionSubjectiveResult.js";


@Injectable()
export class SatisfactionSubjectiveResultDao extends Repository<SatisfactionSubjectiveResult> implements SatisfactionSubjectiveResultRepository{
    constructor(private dataSource: DataSource) { super(SatisfactionSubjectiveResult, dataSource.createEntityManager()); }
}