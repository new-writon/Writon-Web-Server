import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Organization } from "../../entity/Organization.js";
import { OrganizationRepository } from "../Organization.Repository.js";


@Injectable()
export class OrganizationDao extends Repository<Organization> implements OrganizationRepository{
    constructor(private dataSource: DataSource) { super(Organization, dataSource.createEntityManager());} 


        async findOrganizationByName(name: string): Promise<Organization>{
            return this.findOne({
                where:{
                    name
                }
            });
        }



    }