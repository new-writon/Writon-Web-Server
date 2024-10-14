import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard';
import { User } from '../domain/entity/User';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator';
import { AccountUpdate } from '../dto/request/AccountUpdate';
import { UserService } from '../service/User.service';

@Controller('/api/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Patch('/account')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async modifyAccount(
    @Body() accountUpdate: AccountUpdate,
    @CurrentUser() user: User,
  ): Promise<SuccessResponseDto<string>> {
    await this.userService.modifyAccount(
      accountUpdate.getAccountNumber(),
      accountUpdate.getBank(),
      user.userId,
    );
    this.logger.log('계좌 정보 업데이트 완료');
    return SuccessResponseDto.of();
  }

  @Post('/firebase-token')
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async penetrateEngineValue(
    @CurrentUser() user: User,
    @Req() req: Request,
  ): Promise<SuccessResponseDto<string>> {
    await this.userService.penetrateEngineValue(
      user.userId,
      req.headers['engine'] as string,
    );
    this.logger.log('기기 값 저장 완료');
    return SuccessResponseDto.of();
  }
}
