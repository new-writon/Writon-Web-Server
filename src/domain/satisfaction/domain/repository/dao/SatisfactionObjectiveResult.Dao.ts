import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SatisfactionObjectiveResult } from "../../entity/SatisfactionObjectiveResult.js";
import { SatisfactionObjectiveResultRepository } from "../SatisfactionObjectiveResult.Repository.js";

@Injectable()
export class SatisfactionObjectiveResultDao extends Repository<SatisfactionObjectiveResult> implements SatisfactionObjectiveResultRepository{

    constructor(private dataSource: DataSource) { super(SatisfactionObjectiveResult, dataSource.createEntityManager()); }

}