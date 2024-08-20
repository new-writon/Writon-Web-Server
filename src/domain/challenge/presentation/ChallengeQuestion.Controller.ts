import { Controller, Get, HttpCode, Logger, Param } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto";
import { ChallengeQuestionService } from "../service/ChallengeQuestion.Service";
import { SpecialQuestion } from "../dto/response/SpecialQuestion";
import { BasicQuestion } from "../dto/response/BasicQuestion";



@Controller("/api/challenge/question")
export class ChallengeQuestionController{
    private readonly logger = new Logger(ChallengeQuestionController.name);
    constructor(
        private readonly challengeQuestionService: ChallengeQuestionService
    ){}


    @Get('/:challengeId/basic-question')
    @HttpCode(200)
    public async bringBasicQuestion(
         @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<BasicQuestion[]>>{
        const result = await this.challengeQuestionService.bringBasicQuestion(challengeId);
        this.logger.log("베이직 질문 조회 완료");
        return SuccessResponseDto.of(result);
    }


    @Get('/:challengeId/special-question')
    @HttpCode(200)
    public async bringSpecialQuestion(
         @Param('challengeId') challengeId: number
    ): Promise<SuccessResponseDto<SpecialQuestion[]>>{
        const result  = await this.challengeQuestionService.bringSpecialQuestion(challengeId);
        this.logger.log("스페셜 질문 조회 완료");
        return SuccessResponseDto.of(result);
    }
 
}