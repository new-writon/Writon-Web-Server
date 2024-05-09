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



}