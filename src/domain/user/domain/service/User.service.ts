import { HttpException, Injectable } from '@nestjs/common';
import { TestRequestDto } from '../../dto/TestRequest.dto.js';
import { User } from '../entity/User.js';
import { InjectRepository } from '@nestjs/typeorm';
import { TestErrorCode } from '../../exception/TestErrorCode.js';
import { UserRepository } from '../repository/User.Repository.js';
import { CustomException } from '../../exception/UserException.js';
import type { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
   //     @InjectRepository(User) private readonly userRepository: Repository<User>
   private userRepository: UserRepository
    ) { }


    public async test(userId: number): Promise<string> {
 
        const results : User = await this.userRepository.selectUserById(userId);
        console.log(results)

     
        return 'Good'
    }

    // public async selectUserById(userId: number): Promise<User> {
    //     return await this.userRepository.findOne({
    //         where: {
    //             userId: userId
    //         }
    //     })
    // }
  

}
