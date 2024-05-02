import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { Injectable } from '@nestjs/common';
import { UserChallenge } from '../entity/UserChallenge.js';
import { Affiliation } from '../entity/Affiliation.js';
import { UserAffiliationOrganization } from '../../../interface/UserAffilatiionOrganization.interface.js';


export interface UserRepository extends Repository<User> {


    selectUserById(userId: number): Promise<User>;
    selectUserDataBySocialNumber(socialNumber: string): Promise<User>
    kakaoSignUp(email: string,kakaoNumber: string,kakaoProfile: string): void
    localSignUp(identifier: string, password: string, email: string): void
    findUserChallenge(userId: number, organization: string, challengeId: number):UserChallenge[]
    findUserAffiliation(userId: number, organization: string): UserAffiliationOrganization[]
}