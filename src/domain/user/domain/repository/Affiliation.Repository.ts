import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { Affiliation } from '../entity/Affiliation.js';


export interface AffiliationRepository extends Repository<Affiliation> {

    findAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>;
    


}