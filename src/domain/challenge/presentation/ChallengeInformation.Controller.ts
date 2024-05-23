import { Body, Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ChallengeStatus } from "../dto/response/ChallengeStatus.js";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { ChallengeInformationService } from "../service/ChallengeInformation.Service.js";



@Controller("/api/challenge/information")
export class ChallengeInformationController{

    constructor(
        private readonly challengeInformationService: ChallengeInformationService
    ){}

    @Get('/:challengeId/status')
    @HttpCode(200)
    public async signChallengeFinish(
        @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<ChallengeStatus>>{
        const result = await this.challengeInformationService.signChallengeFinish(challengeId);
        return SuccessResponseDto.of(result);
    }

    
    @Get('/:challengeId/:date')
    @HttpCode(200)
    public async signChallengeDay(
         @Param('challengeId') challengeId: number,
         @Param('date') date: Date
    ): Promise<SuccessResponseDto<void>>{
        await this.challengeInformationService.signChallengeDay(challengeId, date);
        return SuccessResponseDto.of();
    }

    @Get('/:challengeId/basic-question')
    @HttpCode(200)
    public async bringBasicQuestion(
         @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<void>>{
     
        return SuccessResponseDto.of();
    }


    @Get('/:challengeId/special-question')
    @HttpCode(200)
    public async bringSpecialQuestion(
         @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<void>>{
      
        return SuccessResponseDto.of();
    }
    

    
}