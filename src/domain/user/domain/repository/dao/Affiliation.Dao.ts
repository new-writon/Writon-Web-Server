import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserChallenge } from '../../entity/UserChallenge.js';
import { Affiliation } from '../../entity/Affiliation.js';
import { AffiliationRepository } from '../Affiliation.Repository.js';
import { Organization } from '../../entity/Organization.js';
import { Challenge } from '../../../../challenge/domain/entity/Challenge.js';
import { ChallengesPerOrganization } from '../../../../user/dto/ChallengesPerOrganization.js';


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
          .getOne();
        }



  async insertAffiliation(userId:number, organizationId:number, nickname: string, job: string,
    jobIntroduce: string, hireDate: string, company: string,companyPublic: boolean):Promise<void>{

    const newAffiliation = Affiliation.createAffiliation(userId, organizationId, nickname, job, jobIntroduce, hireDate, company, companyPublic);
    this.save(newAffiliation);

  }

  async findChallengesPerOrganizationByUserId(userId:number):Promise<ChallengesPerOrganization[]>{
    return this.dataSource.createQueryBuilder()
            .select([
              'o.name AS organization',
              'uc.challenge_id AS challenge_id',
              'c.name AS challenge',
              "CASE WHEN c.finish_at < CURDATE() THEN '1' ELSE '0' END AS challengeFinishSign"
            ])
            .from(Affiliation, 'a')
            .innerJoin(Organization, 'o', 'o.organization_id = a.organization_id')
            .innerJoin(UserChallenge, 'uc', 'uc.affiliation_id = a.affiliation_id')
            .innerJoin(Challenge, 'c', 'c.challenge_id = uc.challenge_id')
            .where('a.user_id = :userId',{userId})
            .orderBy('uc.createdAt', 'DESC')
            .getRawMany();
  }
}


  

    

