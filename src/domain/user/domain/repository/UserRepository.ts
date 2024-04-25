import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entitiy.js';
import { Injectable } from '@nestjs/common';


/**
 * User DAO Class
 */

@EntityRepository(User)
@Injectable()
export class UserRepository extends Repository<User> {}