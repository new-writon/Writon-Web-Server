import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Organization } from "../../entity/Organization";
import { OrganizationRepository } from "../Organization.Repository";
import { Position } from "../../entity/Position";


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


        async findAllOrganization():Promise<Organization[]>{
            return this.createQueryBuilder()
                .select('o')
                .from(Organization, 'o')
                .getMany();
        }

        async findPositionsByOrganizationId(organizationId:number):Promise<Position[]>{
            return this.createQueryBuilder()
                .select('p')
                .from(Position, 'p')
                .where('p.organization_id = :organizationId',{organizationId})
                .getMany();
        }
}