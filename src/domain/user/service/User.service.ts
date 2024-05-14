import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User.js';
import { UserRepository } from '../domain/repository/User.Repository.js';
import { UserException } from '../exception/UserException.js';
import { UserErrorCode } from '../exception/UserErrorCode.js';
import { UserIdentifier } from '../../auth/dto/response/UserIdentifier.js';
import { TokenManager } from '../../../global/util/TokenManager.js';
import {generateRandomPassword} from '../../auth/util/temporaryPassword.js';
import { MailManager } from '../../../global/util/MailManager.js';
import bcrypt from 'bcrypt';
import { AuthService } from '../../auth/service/Auth.Service.js';
import { checkData } from '../../auth/util/checker.js';

@Injectable()
export class UserService {
    constructor(
        @Inject('impluser')
        private readonly userRepository: UserRepository,
        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager,
        private readonly authService: AuthService
    ) { }


    public async test(userId: number): Promise<string> {
        const results : User = await this.userRepository.selectUserById(userId);
        return 'Good'
    }

   


}
