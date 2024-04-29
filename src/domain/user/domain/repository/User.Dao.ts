import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { Injectable } from '@nestjs/common';
import {  UserRepository } from './User.Repository.js';

/**
 * User DAO Class
 */
@Injectable()
export class UserDao extends Repository<User> {
    constructor(private dataSource: DataSource)
    {
        super(User, dataSource.createEntityManager());
    }


    
    public async selectUserById(userId: number): Promise<User> {
        return await this.findOne({
            where: {
                userId: userId
            }
        })
    }

    public async selectUserDataBySocialNumber(socialNumber: string): Promise<User>{
        return await this.findOne({
            where: {
                identifier: socialNumber
            }
        })
    }


    public async kakaoSignUp(  
        email: string,
        kakaoNumber: string,
        kakaoProfile: string
    ){
        const newUser = User.createKakaoUser(email, kakaoNumber, kakaoProfile, "USER");
        return await this.save(newUser);
     
    }
}