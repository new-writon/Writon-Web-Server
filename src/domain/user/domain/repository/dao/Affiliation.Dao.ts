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
    constructor(private dataSource: DataSource) { super(Affiliation, dataSource.createEntityManager()); }


    private async findAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>{
      return this.findOne({
        relations:{
          organization: true

        },
        where:{
          organization: {
            name: organization
          },
          user_id: userId
        }
      })
    }


}
