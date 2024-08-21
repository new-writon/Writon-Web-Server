import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Organization } from "../../entity/Organization";
import { OrganizationRepository } from "../Organization.Repository";


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