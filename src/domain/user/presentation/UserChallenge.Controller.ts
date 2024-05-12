import { Body, Controller, Get, HttpCode, Param, Patch, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { UserChallengeService } from '../service/UserChallenge.Service.js';
import { JWTAuthGuard } from '../../../domain/auth/guards/JwtAuth.Guard.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../../domain/auth/decorators/Auth.Decorator.js';
import { TemplateStatus } from '../dto/response/TemplateStatus.js';
import { UserChallengeSituation } from '../dto/response/UserChallengeSituation.js';

@Controller("/api/user/challenge")
export class UserChallengeController {
    constructor(private readonly userChallengeService: UserChallengeService) {}

    @Get('/:organization/:challengeId/daily-reflection')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async signChallengeFinish(
        @Param('organization') organization: string,
        @Param('challengeId') challengeId: number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<TemplateStatus>>{
        const result = await this.userChallengeService.signTodayTemplateStatus(user.user_id, organization, challengeId);
        return SuccessResponseDto.of(result);
    }

    @Get('/present-situation/:organization/:challengeId')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async presentSituation(
        @Param('organization') organization: string,
        @Param('challengeId') challengeId: number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<UserChallengeSituation>>{

        const result = await this.userChallengeService.presentSituation(user.user_id, organization, challengeId)
        return SuccessResponseDto.of(result);
    }

}
