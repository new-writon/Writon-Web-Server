import { Controller, Get, HttpCode, Logger, Param, Query } from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto';
import { DuplicationCheckService } from '../service/DuplicationCheck.Service';

@Controller('/api/auth/check')
export class DuplicationCheckController {
  private readonly logger = new Logger(DuplicationCheckController.name);

  constructor(private readonly duplicationCheckService: DuplicationCheckService) {}

  @Get('/identifier')
  @HttpCode(200)
  public async checkDuplicateIdentifier(
    @Query('identifier') identifier: string,
  ): Promise<SuccessResponseDto<void>> {
    await this.duplicationCheckService.checkDuplicateIdentifier(identifier);
    this.logger.log('아이디 중복 체크 완료');
    return SuccessResponseDto.of();
  }

  @Get('/email')
  @HttpCode(200)
  public async checkDuplicateEmail(
    @Query('email') email: string,
  ): Promise<SuccessResponseDto<void>> {
    await this.duplicationCheckService.checkDuplicateEmail(email);
    this.logger.log('이메일 중복 체크 완료');
    return SuccessResponseDto.of();
  }

  @Get('/:organization/nickname')
  @HttpCode(200)
  public async checkDuplicateNickname(
    @Query('nickname') nickname: string,
    @Param('organization') organization: string,
  ): Promise<SuccessResponseDto<void>> {
    await this.duplicationCheckService.checkDuplicateNickname(nickname, organization);
    this.logger.log('닉네임 중복 체크 완료');
    return SuccessResponseDto.of();
  }
}
