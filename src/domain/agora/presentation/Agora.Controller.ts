
import { Body, Controller, Get, HttpCode, Logger, Param, UseGuards } from "@nestjs/common";
import { SuccessResponseDto } from "../../../global/response/SuccessResponseDto.js";
import { User } from "../../user/domain/entity/User.js";
import { JWTAuthGuard } from "../../auth/guards/JwtAuth.Guard.js";
import { CurrentUser } from "../../auth/decorators/Auth.Decorator.js";
import { AgoraService } from "../service/Agora.Service.js";
import { AgoraAddResult } from "../dto/response/AgoraAddResult.js";




@Controller("/api/agora")
export class AgoraController{
    private readonly logger = new Logger(AgoraController.name);
    constructor(
        private readonly agoraService:AgoraService
    ){}

    @Get('/check/:challengeId/:date')
    @HttpCode(200)
    public async checkAgoraAdd(
        @Param('challengeId') challengeId: number,
        @Param('date') date: Date,
    ): Promise<SuccessResponseDto<AgoraAddResult>>{
        const result = await this.agoraService.checkAgoraAdd(challengeId, date)
        this.logger.log("아고라 추가 여부 조회 완료");
        return SuccessResponseDto.of(result);
    }


}