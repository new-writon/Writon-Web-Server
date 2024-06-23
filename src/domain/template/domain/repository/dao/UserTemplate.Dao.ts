import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserTemplete } from '../../entity/UserTemplete.js';
import { UserChallenge } from '../../../../user/domain/entity/UserChallenge.js';
import { TemplateContent } from '../../../dto/response/TemplateContent.js';
import { UserTemplateRepository } from '../UserTemplate.Repository.js';


/**
 * User DAO Class
 */
@Injectable()
export class UserTemplateDao extends Repository<UserTemplete> implements UserTemplateRepository {
    constructor(private dataSource: DataSource) { super(UserTemplete, dataSource.createEntityManager()); }


    async findUserTemplateByAffiliationAndChallengeId(affiliationId: number, challengeId: number): Promise<UserTemplete[]> {
        return this.query(`
        select ut.* from UserTemplete as ut
        where date(ut.finished_at) = curdate() 
        and
        ut.user_challenge_id = (select uc.user_challenge_id
        from UserChallenge as uc 
            where uc.affiliation_id = ${affiliationId}
                and uc.challenge_id = ${challengeId});
        `)
    }



  async findChallengeSuccessChallengeCount(affiliationId: number, challengeId: number): Promise<number>{

    const data = await this.query(`
        select count(*) as count from UserTemplete as ut
        where ut.complete = 1
        and
        ut.user_challenge_id = (select uc.user_challenge_id
        from UserChallenge as uc 
            where uc.affiliation_id = ${affiliationId}
                and uc.challenge_id = ${challengeId});
    `)
    return data[0].count
   }


   async findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>{
    return this.createQueryBuilder('ut')
        .select('ut.*')
        .from(UserTemplete, 'ut')
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
        'qc.question_id AS question_id ',
        'qc.user_templete_id AS user_templete_id',
        'qc.question_content_id AS question_content_id',
        'qc.content AS content',
        'ut.finished_at AS created_at',
        'qc.visibility AS visibility',
        'q.category AS category ',
        'q.question AS question',
      ])
      .addSelect('a.job', 'job')
      .addSelect('a.company', 'company')
      .addSelect('a.company_public', 'company_public')
      .addSelect('a.nickname', 'nickname')
      .addSelect('u.profile', 'profile')
      .addSelect('COUNT(DISTINCT l.like_id)', 'likeCount')
      .addSelect('COUNT(DISTINCT cm.comment_id)', 'commentCount')
      .addSelect(`CASE WHEN MAX(CAST(l.affiliation_id AS SIGNED)) = ${affiliationId} THEN 1 ELSE 0 END`, 'myLikeSign')
      .from(UserTemplete, 'ut')
      .innerJoin('UserChallenge', 'uc', 'ut.user_challenge_id = uc.user_challenge_id')
      .innerJoin('QuestionContent', 'qc', 'ut.user_templete_id = qc.user_templete_id')
      .innerJoin('Question', 'q', 'q.question_id = qc.question_id')
      .innerJoin('Affiliation', 'a', 'a.affiliation_id = uc.affiliation_id')
      .innerJoin('User', 'u', 'u.user_id = a.user_id')
      .leftJoin('Likes', 'l', 'l.user_templete_id = ut.user_templete_id')
      .leftJoin('Comment', 'cm', 'cm.user_templete_id = ut.user_templete_id')
      .where('uc.affiliation_id = :affiliationId', { affiliationId })
      .andWhere('uc.challenge_id = :challengeId', { challengeId })
      .groupBy([
        'qc.question_id',
        'qc.user_templete_id',
        'qc.question_content_id',
        'qc.content',
        'q.category',
        'q.question',
        'ut.finished_at',
        'a.job',
        'a.company',
        'a.company_public',
        'a.nickname',
        'u.profile'
      ].join(','))
      .orderBy({
        'ut.finished_at': 'ASC',
        'qc.createdAt': 'ASC',
        'q.createdAt': 'ASC',
      })
      .getRawMany()
  }


  async insertUserTemplate(userChallnegeId: number,date: Date, complete: boolean): Promise<UserTemplete> {
    const newUserTemplate = UserTemplete.createUserTemplate(userChallnegeId, date, complete);
    return this.save(newUserTemplate);
  }


  async findUserTemplateAndCommentAndLikeByUserChallengeId(userChallengeId:number):Promise<UserTemplete[]>{
    return this.dataSource.createQueryBuilder(UserTemplete, 'ut')
      .innerJoinAndSelect('ut.comments', 'c', 'c.user_templete_id = ut.user_templete_id')
      .innerJoinAndSelect('ut.likes', 'l', 'l.user_templete_id = ut.user_templete_id')
      .where('ut.user_challenge_id = :userChallengeId',{userChallengeId})
      .getMany();
  }

  async findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDateWithAffiliationId(userChallengeId:number[], date:Date):Promise<UserTemplete[]>{
    return this.dataSource.createQueryBuilder(UserTemplete, 'ut')
      .leftJoinAndSelect('ut.comments', 'c', 'c.user_templete_id = ut.user_templete_id')
      .leftJoinAndSelect('ut.likes', 'l', 'l.user_templete_id = ut.user_templete_id')
      .innerJoinAndSelect('ut.questionContents', 'qc', 'qc.user_templete_id = ut.user_templete_id')
      .where('ut.user_challenge_id IN (:...userChallengeId)',{userChallengeId})
      .andWhere("ut.finished_at = :date", {date})
      .getMany();
  }

  async findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(userTemplateId: number, visibility: boolean): Promise<UserTemplete> {
    const visibilityValue = visibility ? 1 : 0;
    return this.dataSource.createQueryBuilder()
        .select('ut')
        .from(UserTemplete, 'ut')
        .leftJoinAndSelect('ut.comments', 'c', 'c.user_templete_id = ut.user_templete_id')
        .leftJoinAndSelect('ut.likes', 'l', 'l.user_templete_id = ut.user_templete_id')
        .innerJoinAndSelect('ut.questionContents', 'qc', 'qc.user_templete_id = ut.user_templete_id AND qc.visibility = :visibility', { visibility: visibilityValue })
        .where('ut.user_templete_id = :userTemplateId', { userTemplateId })
        .getOne();
}




}