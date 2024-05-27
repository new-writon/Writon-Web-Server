import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User.js';
import { UserRepository } from '../domain/repository/User.Repository.js';
import { TokenManager } from '../../../global/util/TokenManager.js';
import { MailManager } from '../../../global/util/MailManager.js';
import { AuthService } from '../../auth/service/Auth.Service.js';


@Injectable()
export class UserService {
    constructor(
        @Inject('userImpl')
        private readonly userRepository: UserRepository,
    ) { }


    public async test(userId: number): Promise<string> {
        const results : User = await this.userRepository.selectUserById(userId);
        return 'Good'
    }


   


}
