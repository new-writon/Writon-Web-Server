import { Controller, Get, HttpCode, Logger, Param } from "@nestjs/common";
import { ChallengeStatus } from "../dto/response/ChallengeStatus";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto";
import { ChallengeInformationService } from "../service/ChallengeInformation.Service";
import { ChallengeAccordingToOrganization } from "../dto/response/ChallengeAccordingToOrganization";



@Controller("/api/challenge/information")
export class ChallengeInformationController{
    private readonly logger = new Logger(ChallengeInformationController.name);
    constructor(
        private readonly challengeInformationService: ChallengeInformationService
    ){}

    @Get('/all-organization/all-challenge')
    @HttpCode(200)
    public async bringChallengeAccordingToOrganization(){
        const result = await this.challengeInformationService.bringChallengeAccordingToOrganization();
        this.logger.log("모든 조직의 챌린지 조회 완료");
        return SuccessResponseDto.of(result);
    }
    
    @Get('/:challengeId/status')
    @HttpCode(200)
    public async bringChallengeStatus(
        @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<ChallengeStatus>>{
        const result = await this.challengeInformationService.bringChallengeStatus(challengeId);
        this.logger.log("챌린지 종료 확인 조회 완료");
        return SuccessResponseDto.of(result);
    }

    @Get('/:challengeId')
    @HttpCode(200)
    public async bringChallengeDay(
         @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<string[]>>{
       const result = await this.challengeInformationService.bringChallengeDay(challengeId);
        this.logger.log("챌린지 수행 날짜 조회 완료");
        return SuccessResponseDto.of(result);
    }
    
    @Get('/:challengeId/:date')
    @HttpCode(200)
    public async checkChallengeDay(
         @Param('challengeId') challengeId: number,
         @Param('date') date: string
    ): Promise<SuccessResponseDto<void>>{
        await this.challengeInformationService.checkChallengeDay(challengeId, date);
        this.logger.log("챌린지 수행 날짜 여부 조회 완료");
        return SuccessResponseDto.of();
    }  
}