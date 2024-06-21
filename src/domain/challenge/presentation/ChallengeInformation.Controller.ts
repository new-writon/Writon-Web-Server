import { Body, Controller, Get, HttpCode, Logger, Param } from "@nestjs/common";
import { ChallengeStatus } from "../dto/response/ChallengeStatus.js";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { ChallengeInformationService } from "../service/ChallengeInformation.Service.js";
import { ChallengeAccordingToOrganization } from "../dto/response/ChallengeAccordingToOrganization.js";



@Controller("/api/challenge/information")
export class ChallengeInformationController{
    private readonly logger = new Logger(ChallengeInformationController.name);
    constructor(
        private readonly challengeInformationService: ChallengeInformationService
    ){}

    @Get('/all-organization/all-challenge')
    @HttpCode(200)
    public async bringAllOragnizationAndAllChallenge(): Promise<SuccessResponseDto<ChallengeAccordingToOrganization[]>>{
        const result = await this.challengeInformationService.bringAllOragnizationAndAllChallenge();
        this.logger.log("모든 조직의 챌린지 조회 완료");
        return SuccessResponseDto.of(result);
    }
    
    @Get('/:challengeId/status')
    @HttpCode(200)
    public async signChallengeFinish(
        @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<ChallengeStatus>>{
        const result = await this.challengeInformationService.signChallengeFinish(challengeId);
        this.logger.log("챌린지 종료 확인 조회 완료");
        return SuccessResponseDto.of(result);
    }

    @Get('/:challengeId')
    @HttpCode(200)
    public async bringChallengeDay(
         @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<Date[]>>{
       const result = await this.challengeInformationService.bringChallengeDay(challengeId);
        this.logger.log("챌린지 수행 날짜 조회 완료");
        return SuccessResponseDto.of(result);
    }
    
    @Get('/:challengeId/:date')
    @HttpCode(200)
    public async signChallengeDay(
         @Param('challengeId') challengeId: number,
         @Param('date') date: Date
    ): Promise<SuccessResponseDto<void>>{
        await this.challengeInformationService.signChallengeDay(challengeId, date);
        this.logger.log("챌린지 수행 날짜 여부 조회 완료");
        return SuccessResponseDto.of();
    }  
}