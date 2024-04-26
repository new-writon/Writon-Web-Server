import { HttpException, Injectable } from '@nestjs/common';
import { TestRequestDto } from '../../dto/TestRequest.dto.js';
import { User } from '../entity/User.Entitiy.js';
import { InjectRepository } from '@nestjs/typeorm';
import { TestErrorCode } from '../../exception/TestErrorCode.js';
import { UserRepository } from '../repository/User.Repository.js';
import { CustomException } from '../../exception/UserException.js';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository
    ) { }


    public async test(
        testReqeustDto: TestRequestDto 
    ): Promise<string> {

        const value = true;
        this.verify(value)

        const user = User.createUser(
            testReqeustDto.getNickname(),
            testReqeustDto.getGender(),
            testReqeustDto.getPhone()
        )

        await this.userRepository.save(user);
        return 'Good'
    }


    private verify(value: boolean) {
        if (value === false) {
            throw new CustomException(TestErrorCode.ERROR);
        
        }
    }

}
