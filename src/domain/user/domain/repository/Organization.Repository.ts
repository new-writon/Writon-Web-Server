import { Repository } from "typeorm";
import { Organization } from "../entity/Organization";
import { Affiliation } from "../entity/Affiliation";


export interface OrganizationRepository extends Repository<Organization> {


    findOrganizationByName(name: string): Promise<Organization>;

    
}