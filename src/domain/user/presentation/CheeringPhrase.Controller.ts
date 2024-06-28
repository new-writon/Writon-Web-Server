import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { Participant } from '../dto/response/Participant.js';
import { ParticipantComponent } from '../dto/response/ParticipantComponent.js';
import { CheeringPhraseService } from '../service/CheeringPhrase.Service.js';
import { CheeringPhraseInsert } from '../dto/request/CheeringPhraseInsert.js';



@Controller("/api/user/cheering-phrase")
export class CheeringPhraseController{


    private readonly logger = new Logger(CheeringPhraseController.name);
    constructor(private readonly cheeringPhraseService:CheeringPhraseService) {}


  

    @Get("/:challengeId/my-information")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringMyInformation(
        @Param("challengeId") challengeId:number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<Participant>> {
        const result = await this.cheeringPhraseService.bringMyInformation(user.user_id, challengeId);
        this.logger.log("나의 정보 조회 완료");
        return SuccessResponseDto.of(result);
    }
    
    @Get("/:challengeId/participant-information")
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async bringParticipantInformation(
        @Param("challengeId") challengeId:number,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<ParticipantComponent>> {
        const result = await this.cheeringPhraseService.bringParticipantInformation(user.user_id, challengeId);
        this.logger.log("챌린지 참여자 정보 조회 완료");
        return SuccessResponseDto.of(result);
    }

    @Post()
    @HttpCode(200)
    @UseGuards(JWTAuthGuard)
    public async insertCheeringPhrase(
        @Body() cheeringPhraseInsert:CheeringPhraseInsert,
        @CurrentUser() user: User
    ): Promise<SuccessResponseDto<void>>{
        await this.cheeringPhraseService.insertCheeringPhrase(user.user_id, cheeringPhraseInsert.getOrganization(), cheeringPhraseInsert.getChallengeId(), cheeringPhraseInsert.getContent());
        this.logger.log("오늘의 한마디 추가 완료");
        return SuccessResponseDto.of();
    }

}