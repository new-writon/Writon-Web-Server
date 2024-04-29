import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { Injectable } from '@nestjs/common';


export interface UserRepository extends Repository<User> {


    selectUserById(userId: number): Promise<User>;
    selectUserDataBySocialNumber(socialNumber: string): Promise<User>
    kakaoSignUp(email: string,kakaoNumber: string,kakaoProfile: string): void
}