import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserChallenge } from '../../entity/UserChallenge.js';
import { Affiliation } from '../../entity/Affiliation.js';
import { AffiliationRepository } from '../Affiliation.Repository.js';
import { Organization } from '../../entity/Organization.js';
import { Challenge } from '../../../../challenge/domain/entity/Challenge.js';
import { ChallengesPerOrganization } from '../../../../user/dto/ChallengesPerOrganization.js';
import { UserProfile } from '../../../../user/dto/response/UserProfile.js';
import { User } from '../../entity/User.js';
import { Participant } from '../../../dto/response/Participant.js';


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
              'uc.challenge_id AS challengeId',
              'c.name AS challenge',
              "CASE WHEN c.finish_at < CURDATE() THEN '1' ELSE '0' END AS challengeFinishSign"
            ])
            .from(Affiliation, 'a')
            .innerJoin(Organization, 'o', 'o.organization_id = a.organization_id')
            .innerJoin(UserChallenge, 'uc', 'uc.affiliation_id = a.affiliation_id')
            .innerJoin(Challenge, 'c', 'c.challenge_id = uc.challenge_id') // 수정
            .where('a.user_id = :userId',{userId})
            .orderBy('uc.created_at', 'DESC')
            .getRawMany();
  }


  async findAffiliationByUserIdWithOrganization(userId:number, organization:string):Promise<Affiliation>{
    return this.dataSource.createQueryBuilder()
        .select('a')
        .from(Affiliation, 'a')
        .innerJoin(Organization, 'o', 'o.organization_id = a.organization_id')
        .where('a.user_id = :userId',{userId:userId})
        .andWhere('o.name = :organization',{organization})
        .getOne()

  }

  async findUserProfileByUserIdAndOrganization(userId:number, organization:string):Promise<UserProfile>{
    return this.dataSource.createQueryBuilder()
        .select([
          'u.email AS email',
          'u.profile AS userProfile',
          'u.account_number AS accountNumber',
          'u.bank AS bank',
          'a.nickname AS nickname',
          'a.hire_date AS hiredate',
          'a.company AS company',
          'a.position AS position',
          'a.position_introduce AS positionIntroduce',
          'a.company_public AS companyPublic'
        ])
        .from(Affiliation,'a')
        .leftJoin(User, 'u', 'u.user_id = a.user_id')
        .innerJoin(Organization, 'o', 'o.organization_id = a.organization_id')
        .where('u.user_id = :userId',{userId})
        .andWhere('o.name = :name',{name:organization})
        .getRawOne() 
}


async updateUserProfileByUserIdAndOrganization(userId:number,organization:string,nickname:string, company:string,
  hireDate:Date,position:string, positionIntroduce:string,companyPublic:boolean):Promise<void>{

    const subQuery = this.dataSource.createQueryBuilder()
    .select('o.organization_id')
    .from(Organization, 'o')
    .where('o.name = :organization', { organization })
    .getQuery();
  await this.dataSource.createQueryBuilder()
    .update(Affiliation)
    .set({
      nickname: nickname,
      hireDate: hireDate,
      position: position,
      positionIntroduce: positionIntroduce,
      companyPublic: companyPublic,
      company: company
    })
    .where(`organization_id = (${subQuery})`)
    .andWhere('user_id = :userId', { userId })
    .setParameter('organization', organization)  
    .execute();
  }


  async findAffilaitonWithChallengeIdArray(userChallengeId: number[]): Promise<Affiliation[]> {
    return this.dataSource.createQueryBuilder(Affiliation, 'a')
        .innerJoinAndSelect('a.userChallenges', 'uc', 'uc.affiliation_id = a.affiliation_id')
        .where('uc.user_challenge_id IN (:...userChallengeId)', { userChallengeId })
        .getMany();
  }

  async findAffilaitonWithChallengeIdAndUserChallengeId(challengeId:number, userChallengeId:number[]):Promise<Affiliation[]>{
    return this.dataSource.createQueryBuilder(Affiliation, 'a')
      .innerJoinAndSelect('a.userChallenges', 'uc','uc.affiliation_id = a.affiliation_id')
      .where('uc.challenge_id = :challengeId',{challengeId})
      .andWhere('uc.user_challenge_id IN (:...userChallengeIds)',{userChallengeIds:userChallengeId})
      .getMany();
  }

  async findAffiliationById(affiliationId: number[]):Promise<Affiliation[]>{
    return this.dataSource.createQueryBuilder()
      .select('a')
      .from(Affiliation, 'a')
      .where('a.affiliation_id IN (:...affiliationIds)',{affiliationIds:affiliationId})
      .getMany();
  }

  async findAffiliationAndUserById(affiliationIds: number[]):Promise<Affiliation[]>{
    return this.dataSource.createQueryBuilder(Affiliation, 'a')
      .leftJoinAndSelect('a.user', 'u','u.user_id = a.user_id')
      .where('a.affiliation_id IN (:...affiliationIds)',{affiliationIds})
      .getMany();
  }

  async findAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(userId:number, challengeId:number):Promise<Participant>{
    const myInformation:Participant = await this.dataSource.createQueryBuilder()
          .select([
            'u.profile AS profile',
            'a.position AS position', 
            'a.position_introduce AS positionIntroduce',
            'a.nickname AS nickname',
            'a.company_public AS companyPublic',
            'a.company AS company',
            'u.email AS email',
            'uc.cheering_phrase AS cheeringPhrase',
            'uc.cheering_phrase_date AS cheeringPhraseDate ' 
          ])
          .from(Affiliation, 'a')
          .leftJoin(User, 'u', 'u.user_id = a.user_id')
          .innerJoin(UserChallenge, 'uc', 'uc.affiliation_id = a.affiliation_id')
          .where('u.user_id = :userId',{userId})
          .andWhere('uc.challenge_id = :challengeId', {challengeId})
          .getRawOne();
    return Participant.myInformationOf(myInformation);   
  }

  async findAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(userId:number, challengeId:number):Promise<Participant[]>{
    const participants:Participant[] = await this.dataSource.createQueryBuilder()
          .select([
            'u.profile AS profile',
            'a.position AS position', 
            'a.position_introduce AS positionIntroduce',
            'a.nickname AS nickname',
            'a.company_public AS companyPublic',
            'a.company AS company',
            'u.email AS email',
            'uc.cheering_phrase AS cheeringPhrase',
            'uc.cheering_phrase_date AS cheeringPhraseDate ' 
          ])
          .from(Affiliation, 'a')
          .leftJoin(User, 'u', 'u.user_id = a.user_id')
          .innerJoin(UserChallenge, 'uc', 'uc.affiliation_id = a.affiliation_id')
          .where('u.user_id != :userId',{userId})
          .andWhere('uc.challenge_id = :challengeId', {challengeId})
          .getRawMany();
    return Participant.participantOf(participants);   
  }

  async findAffiliationAndUserByUserIdAndOrganization(userId: number, organization: string):Promise<Affiliation>{
    return this.dataSource.createQueryBuilder()
      .select('a')
      .from(Affiliation, 'a')
      .innerJoinAndSelect('a.user', 'u','u.user_id = a.user_id')
      .innerJoin('a.organization', 'o')
      .where("a.user_id = :userId", {userId:userId})
      .andWhere('o.name = :organization', { organization: organization })
      .getOne();
  }


  
}


  

    

