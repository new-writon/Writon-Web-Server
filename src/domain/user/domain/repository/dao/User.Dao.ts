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
export class UserDao extends Repository<User> {
    constructor(private dataSource: DataSource) { super(User, dataSource.createEntityManager()); }



    private async selectUserById(userId: number): Promise<User> {
        return await this.findOne({
            where: {
                userId: userId
            }
        })
    }

    private async selectUserDataBySocialNumberOrIdentifier(socialNumber: string): Promise<User> {
        return await this.findOne({
            where: {
                identifier: socialNumber
            }
        })
    }


    private async kakaoSignUp(
        email: string,
        kakaoNumber: string,
        kakaoProfile: string
    ) {
        const newUser = User.createKakaoUser(email, kakaoNumber, kakaoProfile, "USER");
        return await this.save(newUser);
    }

    private async localSignUp(
        identifier: string,
        password: string,
        email: string
    ) {
        const newUser = User.createLocalUser(identifier, password, email, "USER");
        return await this.save(newUser);
    }


    private async findUserAffiliation(userId: number, organization: string): Promise<UserAffiliationOrganization[]> {

        return await this.dataSource.query(`
            SELECT *
            FROM User AS u
            INNER JOIN Affiliation AS a ON a.user_id = u.user_id
            INNER JOIN Organization AS o ON o.organization_id = a.organization_id
            WHERE a.user_id = ${userId} AND o.name = '${organization}'
        `);
    }


    private async findUserChallenge(userId: number, organization: string, challengeId: number): Promise<UserChallenge[]> {
        return await this.dataSource.query(`
            SELECT uc.*  FROM UserChallenge as uc
            WHERE uc.affiliation_id = ( SELECT a.affiliation_id FROM Affiliation as a
                WHERE a.user_id = ${userId} 
                AND a.organization_id = (
                    SELECT o.organization_id FROM Organization as o
                    WHERE o.name = '${organization}' ))
            AND uc.challenge_id = ${challengeId};
        
        `);




    }
}