import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserTemplate } from '../../entity/UserTemplate.js';
import { UserChallenge } from '../../../../user/domain/entity/UserChallenge.js';
import { TemplateContent } from '../../../dto/response/TemplateContent.js';
import { UserTemplateRepository } from '../UserTemplate.Repository.js';


/**
 * User DAO Class
 */
@Injectable()
export class UserTemplateDao extends Repository<UserTemplate> implements UserTemplateRepository {
    constructor(private dataSource: DataSource) { super(UserTemplate, dataSource.createEntityManager()); }

    async findUserTemplateByAffiliationAndChallengeId(affiliationId: number, challengeId: number): Promise<UserTemplate[]> {
      return this.dataSource.createQueryBuilder()
          .select('ut')
          .from(UserTemplate, 'ut')
          .innerJoin(UserChallenge, 'uc', 'ut.user_challenge_id = uc.user_challenge_id')
          .where('uc.affiliation_id = :affiliationId', { affiliationId })
          .andWhere('uc.challenge_id = :challengeId', { challengeId })
          .orderBy("DATE_FORMAT(ut.finished_at, '%Y-%m')")
          .getMany();
    
        
        
        
        
        // this.query(`
        // select ut.* from UserTemplate as ut
        // where 
        // ut.user_challenge_id = (select uc.user_challenge_id
        // from UserChallenge as uc 
        //     where uc.affiliation_id = ${affiliationId}
        //         and uc.challenge_id = ${challengeId}
        //         order by date_format(ut.finished_at, '%Y-%m')
        //         );
        // `)
    }



  async findChallengeSuccessChallengeCount(affiliationId: number, challengeId: number): Promise<number>{

    const data = await this.query(`
        select count(*) as count from UserTemplate as ut
        where ut.complete = 1
        and
        ut.user_challenge_id = (select uc.user_challenge_id
        from UserChallenge as uc 
            where uc.affiliation_id = ${affiliationId}
                and uc.challenge_id = ${challengeId});
    `)
    return data[0].count
   }


   async findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplate[]>{
    return this.createQueryBuilder('ut')
        .select('ut.*')
        .from(UserTemplate, 'ut')
        .where('ut.user_challenge_id = :userChallengeId', {
            userChallengeId: (qb) => {
                qb.select('uc.user_challenge_id')
                    .from(UserChallenge, 'uc')
                    .where('uc.affiliation_id = :affiliationId', { affiliationId:affiliationId })
                    .andWhere('uc.challenge_id = :challengeId', { challengeId: challengeId });
            }
        })
        .orderBy("date_format(ut.finished_at, '%Y-%m')")
        .getRawMany()
   };


   async findUserTemplateByChallengeIdForAffiliationId(affiliationId: number, challengeId: number): Promise<TemplateContent[]> {
    return await this.dataSource.createQueryBuilder()
      .select([
        'qc.question_id AS questionId ',
        'qc.user_template_id AS userTemplateId',
        'qc.question_content_id AS questionContentId',
        'qc.content AS content',
        'ut.template_date AS createdAt',
        'qc.visibility AS visibility',
        'q.category AS category ',
        'q.question AS question',
        'a.affiliation_id AS affiliationId'
      ])
      .addSelect('a.position', 'position')
      .addSelect('a.company', 'company')
      .addSelect('a.company_public', 'companyPublic')
      .addSelect('a.nickname', 'nickname')
      .addSelect('u.profile', 'profile')
      .addSelect('COUNT(DISTINCT l.like_id)', 'likeCount')
      .addSelect('COUNT(DISTINCT cm.comment_id)', 'commentCount')
      .addSelect(`CASE WHEN MAX(CAST(l.affiliation_id AS SIGNED)) = ${affiliationId} THEN 1 ELSE 0 END`, 'myLikeSign')
      .from(UserTemplate, 'ut')
      .innerJoin('UserChallenge', 'uc', 'ut.user_challenge_id = uc.user_challenge_id')
      .innerJoin('QuestionContent', 'qc', 'ut.user_template_id = qc.user_template_id')
      .innerJoin('Question', 'q', 'q.question_id = qc.question_id')
      .innerJoin('Affiliation', 'a', 'a.affiliation_id = uc.affiliation_id')
      .innerJoin('User', 'u', 'u.user_id = a.user_id')
      .leftJoin('Likes', 'l', 'l.user_template_id = ut.user_template_id')
      .leftJoin('Comment', 'cm', 'cm.user_template_id = ut.user_template_id')
      .where('uc.affiliation_id = :affiliationId', { affiliationId })
      .andWhere('uc.challenge_id = :challengeId', { challengeId })
      .groupBy([
        'qc.question_id',
        'qc.user_template_id',
        'qc.question_content_id',
        'qc.content',
        'q.category',
        'q.question',
        'ut.template_date',
        'a.position',
        'a.company',
        'a.company_public',
        'a.nickname',
        'u.profile'
      ].join(','))
      .orderBy({
        'ut.template_date': 'ASC',
        'qc.created_at': 'ASC',
        'q.created_at': 'ASC',
      })
      .getRawMany()
  }


  async insertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplate> {
    const newUserTemplate = UserTemplate.createUserTemplate(userChallnegeId, date, complete);
    return this.save(newUserTemplate);
  }


  async findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplate[]>{
    return this.dataSource.createQueryBuilder(UserTemplate, 'ut')
      .innerJoinAndSelect('ut.comments', 'c', 'c.user_template_id = ut.user_template_id')
      .innerJoinAndSelect('ut.likes', 'l', 'l.user_template_id = ut.user_template_id')
      .where('ut.user_challenge_id = :userChallengeId',{userChallengeId})
      .getMany();
  }

  async findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId:number[], date:Date):Promise<UserTemplate[]>{
    return this.dataSource.createQueryBuilder(UserTemplate, 'ut')
      .leftJoinAndSelect('ut.comments', 'c', 'c.user_template_id = ut.user_template_id')
      .leftJoinAndSelect('ut.likes', 'l', 'l.user_template_id = ut.user_template_id')
      .innerJoinAndSelect('ut.questionContents', 'qc', 'qc.user_template_id = ut.user_template_id AND qc.visibility = 1')
      .where('ut.user_challenge_id IN (:...userChallengeId)',{userChallengeId})
      .andWhere("ut.template_date = :date", {date})
      .getMany();
  }

  async findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId: number, visibility: boolean): Promise<UserTemplate> {
    return this.dataSource.createQueryBuilder()
        .select('ut')
        .from(UserTemplate, 'ut')
        .leftJoinAndSelect('ut.comments', 'c', 'c.user_template_id = ut.user_template_id')
        .leftJoinAndSelect('ut.likes', 'l', 'l.user_template_id = ut.user_template_id')
        .innerJoinAndSelect('ut.questionContents', 'qc', 'qc.user_template_id = ut.user_template_id AND qc.visibility = :visibility', { visibility})
        .where('ut.user_template_id = :userTemplateId', { userTemplateId })
        .getOne();
}




}