import { Repository } from "typeorm";
import { Organization } from "../entity/Organization";



export interface OrganizationRepository extends Repository<Organization> {
    findOrganizationByName(name: string): Promise<Organization>;
}