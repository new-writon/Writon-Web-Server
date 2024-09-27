



import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/User';
import { Injectable } from '@nestjs/common';
import { UserAffiliationOrganization } from '../../../dto/values/UserAffilatiionOrganization.interface';
import { UserRepository } from '../User.Repository';
import { FirebaseToken } from '../../entity/FirebaseToken';
import { FirebaseTokenRepository } from '../FirebaseToken.Repository';



/**
 * User DAO Class
 */
@Injectable()
export class FirebaseTokenDao extends Repository<FirebaseToken> implements FirebaseTokenRepository{
    constructor(private dataSource: DataSource) { super(User, dataSource.createEntityManager()); }


    async findFirebaseTokenByUserIdAndEngineValue(userId:number, engineValue:string):Promise<FirebaseToken>{
        return this.dataSource.createQueryBuilder()
            .select('fb')
            .from(FirebaseToken, 'fb')
            .where('fb.user_id = :userId', {userId})
            .andWhere('fb.engine_value = :engineValue', {engineValue})
            .getOne();
    }

    async insertFirebaseToken(userId:number, engineValue:string):Promise<void>{
        const newFirebaseToken = FirebaseToken.createFirebaseToken(engineValue, userId);
        await this.save(newFirebaseToken);
    }

    async deleteFirebaseToken(userId:number, engineValue:string):Promise<void>{
        await this.dataSource.createQueryBuilder()
            .delete()
            .from(FirebaseToken)
            .where('fb.user_id = :userId', {userId})
            .andWhere('fb.engine_value = :engineValue', {engineValue})
            .execute();
    }

}