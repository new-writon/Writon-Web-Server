import { Body, Controller, Get, HttpCode, Patch, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {  UserService } from '../service/User.Service.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { UserChallengeService } from '../service/UserChallenge.Service.js';

@Controller("/api/user/challenge")
export class UserChallengeController {
    constructor(private readonly userChallengeService: UserChallengeService) {}

    

}
