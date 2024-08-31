import { Body, Controller, Get, HttpCode, Logger, Param, Post, UseGuards} from '@nestjs/common';
import { OrganizationService } from '../service/Organization.Service';
import { SuccessResponseDto } from 'src/global/response/SuccessResponseDto';
import { PositionNames } from '../dto/response/PositionNames';



@Controller("/api/organization")
export class OrgnizationController{


    private readonly logger = new Logger(OrgnizationController.name);
    constructor(
        private readonly organizationService:OrganizationService
    ) {}

    @Get("/:organizationId")
    @HttpCode(200)
    public async bringPositions(@Param("organizationId") organizationId:number):Promise<SuccessResponseDto<PositionNames>> {
        const result = await this.organizationService.bringPositions(organizationId);
        this.logger.log("조직별 포지션 조회 완료")
        return SuccessResponseDto.of(result);
    }
}