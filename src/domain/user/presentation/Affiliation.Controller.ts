import { Body, Controller, Get, HttpCode, Logger, Param, Post, Put, UseGuards} from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { AffiliationService } from '../service/Affiliation.Service.js';
import { AffiliationStart } from '../dto/request/AffiliationStart.js';
import { UserProfile } from '../dto/response/UserProfile.js';
import { ProfileUpdate } from '../dto/request/ProfileUpdate.js';
import { Participant } from '../dto/response/Participant.js';
import { ParticipantComponent } from '../dto/response/ParticipantComponent.js';


@Controller("/api/user/affiliation")
export class AffiliationController {
  private readonly logger = new Logger(AffiliationController.name);
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
    this.logger.log("소속 참여 완료");
    return SuccessResponseDto.of();
  }

  @Put("/:organization/profile")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async updateUserProfileAccordingToOrganization(
    @Body() profileUpdate: ProfileUpdate,
    @Param('organization') organization: string,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>  {
    await this.affiliationService.updateUserProfileAccordingToOrganization(user.user_id, organization, profileUpdate.getNickname(),
    profileUpdate.getCompany(), profileUpdate.getHireDate(), profileUpdate.getJob(), profileUpdate.getJobIntroduce(), profileUpdate.getComanyPublic()
  );
   this.logger.log("소속 프로필 업데이트 완료");
    return SuccessResponseDto.of();
  }


  @Get('/:organization/profile')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async bringUserProfileAccordingToOrganization(
    @Param('organization') organization: string,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<UserProfile>>  {
    const result = await this.affiliationService.bringUserProfileAccordingToOrganization(user.user_id, organization);
    this.logger.log("소속 프로필 조회 완료");
    return SuccessResponseDto.of(result);
  }




}
