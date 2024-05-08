import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/User.js';
import { Injectable } from '@nestjs/common';
import { UserChallenge } from '../../entity/UserChallenge.js';
import { Affiliation } from '../../entity/Affiliation.js';
import { UserAffiliationOrganization } from 'src/domain/interface/UserAffilatiionOrganization.interface.js';


/**
 * User DAO Class
 */
@Injectable()
export class AffiliationDao extends Repository<Affiliation> {
    constructor(private dataSource: DataSource) { super(User, dataSource.createEntityManager()); }


    private async findAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>{
        return this.query(`
        SELECT 
        a.* 
        FROM Affiliation as a
        WHERE a.user_id = ${userId} 
        AND a.organization_id = (
          SELECT o.organization_id FROM Organization as o
          WHERE o.name = ${organization}
        );
        `)
    }





}