import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/User.js';
import { Injectable } from '@nestjs/common';
import { UserChallenge } from '../../entity/UserChallenge.js';
import { Affiliation } from '../../entity/Affiliation.js';
import { UserAffiliationOrganization } from 'src/domain/interface/UserAffilatiionOrganization.interface.js';
import { AffiliationRepository } from '../Affiliation.Repository.js';
import { Organization } from '../../entity/Organization.js';


/**
 * User DAO Class
 */
@Injectable()
export class AffiliationDao extends Repository<Affiliation> implements AffiliationRepository{
    constructor(private dataSource: DataSource) { super(Affiliation, dataSource.createEntityManager()); }

    async findAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>{

      return this.dataSource
        .createQueryBuilder()
        .select('a')
        .from(Affiliation,'a')
        .innerJoin('a.organization', 'o')
        .where("a.user_id = :userId", {userId:userId})
        .andWhere('o.name = :organization', { organization: organization })
        .getOne();
    }

    async findAffiliationByNicknameAndOrganization(nickname: string, organization: string): Promise<Affiliation | null> {
      return this.dataSource
          .createQueryBuilder(Affiliation, 'a')
          .where('a.nickname = :nickname', { nickname })
          .andWhere(qb => {
              const subQuery = qb.subQuery()
                  .select('o.organization_id')
                  .from(Organization, 'o')
                  .where('o.name = :organization', { organization })
                  .getQuery();
              return `a.organization_id = (${subQuery})`;
          })
          .setParameter('organization', organization)
          .getOne();
        }
}


  

    

