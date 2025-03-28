import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserTemplate } from '../../entity/UserTemplate';
import { UserTemplateRepository } from '../UserTemplate.Repository';

/**
 * User DAO Class
 */
@Injectable()
export class UserTemplateDao extends Repository<UserTemplate> implements UserTemplateRepository {
  constructor(private dataSource: DataSource) {
    super(UserTemplate, dataSource.createEntityManager());
  }

  async findUserTemplateByUserChallengeId(userChallengeId: number): Promise<UserTemplate[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('ut')
      .from(UserTemplate, 'ut')
      .where('ut.user_challenge_id = :userChallengeId', { userChallengeId })
      .orderBy("DATE_FORMAT(ut.template_date, '%Y-%m')")
      .getMany();
  }

  async findChallengeSuccessChallengeCount(userChallengeId: number): Promise<number> {
    const data = await this.query(`
        select count(*) as count from user_templates as ut
        where ut.complete = 1
        and
        ut.user_challenge_id = ${userChallengeId}
    `);
    return data[0].count;
  }

  async findUserTemplateByUserChallengeIdAndDate(
    userChallengeId: number,
    date: string,
  ): Promise<UserTemplate> {
    return this.dataSource
      .createQueryBuilder()
      .select('ut')
      .from(UserTemplate, 'ut')
      .where('ut.user_challenge_id = :userChallengeId', { userChallengeId })
      .andWhere('ut.template_date = :date', { date })
      .getOne();
  }

  async insertUserTemplate(
    userChallnegeId: number,
    date: Date,
    complete: boolean,
  ): Promise<UserTemplate> {
    const newUserTemplate = UserTemplate.createUserTemplate(userChallnegeId, date, complete);
    return this.save(newUserTemplate);
  }

  async findUserTemplateAndCommentAndLikeByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]> {
    return this.dataSource
      .createQueryBuilder(UserTemplate, 'ut')
      .leftJoinAndSelect('ut.comments', 'c', 'c.user_template_id = ut.user_template_id')
      .leftJoinAndSelect('ut.likes', 'l', 'l.user_template_id = ut.user_template_id')
      .where('ut.user_challenge_id = :userChallengeId', { userChallengeId })
      .getMany();
  }

  async findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(
    userChallengeId: number[],
    date: Date,
  ): Promise<UserTemplate[]> {
    return this.dataSource
      .createQueryBuilder(UserTemplate, 'ut')
      .leftJoinAndSelect('ut.comments', 'c', 'c.user_template_id = ut.user_template_id')
      .leftJoinAndSelect('ut.likes', 'l', 'l.user_template_id = ut.user_template_id')
      .innerJoinAndSelect(
        'ut.questionContents',
        'qc',
        'qc.user_template_id = ut.user_template_id AND qc.visibility = 1',
      )
      .where('ut.user_challenge_id IN (:...userChallengeId)', {
        userChallengeId,
      })
      .andWhere('ut.template_date = :date', { date })
      .getMany();
  }

  async findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]> {
    return this.dataSource
      .createQueryBuilder(UserTemplate, 'ut')
      .leftJoinAndSelect('ut.comments', 'c', 'c.user_template_id = ut.user_template_id')
      .leftJoinAndSelect('ut.likes', 'l', 'l.user_template_id = ut.user_template_id')
      .innerJoinAndSelect('ut.questionContents', 'qc', 'qc.user_template_id = ut.user_template_id')
      .where('ut.user_challenge_id = :userChallengeId', { userChallengeId })
      .getMany();
  }

  async findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(
    userTemplateId: number,
    visibility: boolean,
  ): Promise<UserTemplate> {
    return this.dataSource
      .createQueryBuilder()
      .select('ut')
      .from(UserTemplate, 'ut')
      .leftJoinAndSelect('ut.comments', 'c', 'c.user_template_id = ut.user_template_id')
      .leftJoinAndSelect('ut.likes', 'l', 'l.user_template_id = ut.user_template_id')
      .innerJoinAndSelect(
        'ut.questionContents',
        'qc',
        'qc.user_template_id = ut.user_template_id AND (qc.visibility = 1 OR qc.visibility = :visibility)',
        { visibility },
      )
      .where('ut.user_template_id = :userTemplateId', { userTemplateId })
      .getOne();
  }

  async findUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]) {
    return this.dataSource
      .createQueryBuilder()
      .select('ut.user_challenge_id', 'userChallengeId')
      .addSelect('CAST(COUNT(ut.user_challenge_id) AS CHAR)', 'count')
      .from(UserTemplate, 'ut')
      .where('ut.user_challenge_id IN (:...userChallengeIds)', {
        userChallengeIds,
      })
      .andWhere('ut.complete = 1')
      .groupBy('ut.user_challenge_id')
      .getRawMany();
  }

  async findUserTemplateById(userTemplateId: number): Promise<UserTemplate> {
    return this.dataSource
      .createQueryBuilder()
      .select('ut')
      .from(UserTemplate, 'ut')
      .where('ut.user_template_id = :userTemplateId', { userTemplateId })
      .getOne();
  }
}
