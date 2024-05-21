import { Body, Controller, Get, HttpCode, Post, UseGuards} from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { AffiliationService } from '../service/Affiliation.Service.js';
import { AffiliationStart } from '../dto/request/AffiliationStart.js';


@Controller("/api/user/affiliation")
export class AffiliationController {
  constructor(private readonly affiliationService:AffiliationService) {}


  @Post("/enter")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async enterAffiliation(
    @Body() affiliationStartDto: AffiliationStart,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>  {

    await this.affiliationService.enterAffiliation(user.user_id, affiliationStartDto.getOrganization(), affiliationStartDto.getNickname(),
     affiliationStartDto.getJob(), affiliationStartDto.getJobIntroduce(), String(affiliationStartDto.getHireDate()), affiliationStartDto.getCompany(),
     affiliationStartDto.getCompanyPublic())
    return SuccessResponseDto.of();
  }



  

}
