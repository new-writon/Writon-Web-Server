import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserTemplete } from '../../entity/UserTemplete.js';
import { UserChallenge } from '../../../../user/domain/entity/UserChallenge.js';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation.js';

/**
 * User DAO Class
 */
@Injectable()
export class UserTemplateDao extends Repository<UserTemplete> {
    constructor(private dataSource: DataSource) { super(UserTemplete, dataSource.createEntityManager()); }


    private async findUserTemplateByAffiliationAndChallengeId(affiliationId: number, challengeId: number): Promise<UserTemplete[]> {
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



   private async findSuccessChallengeCount(affiliationId: number, challengeId: number): Promise<number>{

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


   private async findUserTemplateByAffiliationAndChallengeIdAndDateFormat(affiliationId: number, challengeId: number): Promise<UserTemplete[]>{
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
        .getRawMany();

   }



}