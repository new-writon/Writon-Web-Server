import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { UserChallengeService } from '../service/UserChallenge.Service.js';
import { JWTAuthGuard } from '../../../domain/auth/guards/JwtAuth.Guard.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../../domain/auth/decorators/Auth.Decorator.js';
import { TemplateStatus } from '../dto/response/TemplateStatus.js';
import { UserChallengeSituation } from '../dto/response/UserChallengeSituation.js';
import { CalendarData } from '../dto/response/CalendarData.js';
import { ChallengeStart } from '../dto/request/ChallegeStart.js';
import { ChallengesPerOrganization } from '../dto/ChallengesPerOrganization.js';
import { ParticipationInChallengePerAffiliation } from '../dto/response/ParticipationInChallengePerAffiliation.js';
import { UserChallengeCheckCount } from '../dto/response/UserChallengeCheckCount.js';
import { UserChallengeCheckCountUpdate } from '../dto/request/UserChallengeCheckCountUpdate.js';

@Controller("/api/user/challenge")
export class UserChallengeController {
    private readonly logger = new Logger(UserChallengeController.name);
    constructor(private readonly userChallengeService: UserChallengeService) {}


    

    @Get('/:organization/:challengeId/daily-reflection')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async signTemplateStatus(
        @Param('organization') organization: string,
        @Param('challengeId') challengeId: number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<TemplateStatus>>{
        const result = await this.userChallengeService.signTemplateStatus(user.userId, organization, challengeId);
        this.logger.log("챌린지 종료 여부 완료");
        return SuccessResponseDto.of(result);
    }

    @Get('/present-situation/:organization/:challengeId')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringUserChallengeSituation(
        @Param('organization') organization: string,
        @Param('challengeId') challengeId: number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<UserChallengeSituation>>{
        const result = await this.userChallengeService.bringUserChallengeSituation(user.userId, organization, challengeId);
        this.logger.log("챌린지 현재 상황 조회 완료");
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
        const result : CalendarData = await this.userChallengeService.bringCalendarData(user.userId, organization, challengeId);
        this.logger.log("챌린지 캘린더 데이터 조회 완료");
        return SuccessResponseDto.of(result);
    }


    @Post('/start')
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async startChallenge(
        @Body() challengeStart: ChallengeStart,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>{
        await this.userChallengeService.startChallenge(user.userId, challengeStart.getOrganization(), challengeStart.getChallengeId());
        this.logger.log("챌린지 참여 완료");
        return SuccessResponseDto.of();
    }

    @Post('/initialization/deposit')
    @HttpCode(200)
    public async initializeDeposit(): Promise<SuccessResponseDto<void>>{
        await this.userChallengeService.initializeDeposit();
        this.logger.log("챌린지 보증금 초기화 완료");
        return SuccessResponseDto.of();
    }


    @Get()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringChallengesPerOrganization(
      @CurrentUser() user: User
    ): Promise<SuccessResponseDto<ChallengesPerOrganization[]>> {
        const result = await this.userChallengeService.bringChallengesPerOrganization(user.userId);
        this.logger.log("조직별 챌린지 조회 완료");
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
        const result:ParticipationInChallengePerAffiliation = await this.userChallengeService.bringParticipationInChallengePerAffiliation(user.userId, organization, challengeId);
        this.logger.log("챌린지, 소속 참여 상태 조회 완료");
        return SuccessResponseDto.of(result);
    }


    @Get("/:organization/:challengeId/check-count")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringUserChallengeCheckCount(
        @Param("organization") organization:string,
        @Param("challengeId") challengeId:number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<UserChallengeCheckCount>> {
        const result = await this.userChallengeService.bringUserChallengeCheckCount(user.userId, organization, challengeId);
        this.logger.log("유저 챌린지 체크 개수 조회 완료");
        return SuccessResponseDto.of(result);
    }


    @Patch("/:organization/:challengeId/check-count")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async modifyUserChallengeCheckCount(
        @Body() userChallengeCheckCountUpdate: UserChallengeCheckCountUpdate,
        @Param("organization") organization:string,
        @Param("challengeId") challengeId:number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<null>> {
        await this.userChallengeService.modifyUserChallengeCheckCount(user.userId, organization, challengeId, userChallengeCheckCountUpdate.getCheckCount());
        this.logger.log("유저 챌린지 체킹 카운트 업데이트 완료");
        return SuccessResponseDto.of();
    }

}
