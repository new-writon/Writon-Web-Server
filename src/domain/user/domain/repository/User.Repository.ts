import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { UserAffiliationOrganization } from '../../../interface/UserAffilatiionOrganization.interface.js';
import { UserProfile } from '../../dto/response/UserProfile.js';


export interface UserRepository extends Repository<User> {


    selectUserById(userId: number): Promise<User>;
    selectUserDataBySocialNumberOrIdentifier(socialNumber: string): Promise<User>
    findUserByEmail(email: string): Promise<User>
    kakaoSignUp(email: string,kakaoNumber: string,kakaoProfile: string): void
    localSignUp(identifier: string, password: string, email: string): void
    findUserAffiliation(userId: number, organization: string): Promise<UserAffiliationOrganization[]>
    selectUserDataByEmail(email: string): Promise<User>
    updatePassword(idenfitier:string, email:string, password:string):void
    updatePasswordByUserId(userId: number, newPassword: string):void
    updateAccount(accountNumber:string, bank:string, userId:number):Promise<void>;
   
}