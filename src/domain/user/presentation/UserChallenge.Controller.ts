import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { UserChallengeService } from '../service/UserChallenge.Service.js';
import { JWTAuthGuard } from '../../../domain/auth/guards/JwtAuth.Guard.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../../domain/auth/decorators/Auth.Decorator.js';
import { TemplateStatus } from '../dto/response/TemplateStatus.js';
import { UserChallengeSituation } from '../dto/response/UserChallengeSituation.js';
import { Calendar } from '../dto/response/Calendar.js';
import { CalendarData } from '../dto/response/CalendarData.js';
import { ChallengeStart } from '../dto/request/ChallegeStart.js';
import { ChallengesPerOrganization } from '../dto/ChallengesPerOrganization.js';
import { ParticipationInChallengePerAffiliation } from '../dto/response/ParticipationInChallengePerAffiliation.js';

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


    @Get('/calendar/:organization/:challengeId')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringCalendarData(
        @Param('organization') organization: string,
        @Param('challengeId') challengeId: number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<CalendarData>>{
        const result : CalendarData = await this.userChallengeService.bringCalendarData(user.user_id, organization, challengeId);
        return SuccessResponseDto.of(result);
    }


    @Post('/start')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async startChallenge(
        @Body() challengeStart: ChallengeStart,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>{
        await this.userChallengeService.startChallenge(user.user_id, challengeStart.getOrganization(), challengeStart.getChallengeId())
        return SuccessResponseDto.of();
    }


    @Get()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringChallengesPerOrganization(
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<ChallengesPerOrganization[]>> {
        const result = await this.userChallengeService.bringChallengesPerOrganization(user.user_id);
        return SuccessResponseDto.of(result);
    }


    @Get("/:organization/:challengeId/participation")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringParticipationInChallengePerAffiliation(
        @Param("organization") organization:string,
        @Param("challengeId") challengeId:number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<ParticipationInChallengePerAffiliation>> {

        const result:ParticipationInChallengePerAffiliation = await this.userChallengeService.bringParticipationInChallengePerAffiliation(user.user_id, organization, challengeId);
        return SuccessResponseDto.of(result);
    }

}
