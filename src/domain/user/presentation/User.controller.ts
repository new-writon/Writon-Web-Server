import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {  UserService } from '../service/User.Service.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { TestRequestDto } from '../dto/TestRequest.dto.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { CurrentUserInterceptor } from '../../auth/interceptors/CurrentUser.Interceptor.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { AccountUpdate } from '../dto/request/AccountUpdate.js';

@Controller("/api/user")
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  public async getHello(
    @Body() testReqeustDto :TestRequestDto,
    @Req() req:Request,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<string>>  {
    console.log(user)
    console.log(req.body)
    const result :string = await this.userService.test(user.user_id);
    return SuccessResponseDto.of(result);
  }

  @Patch("/account")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async updateAccount(
    @Body() accountUpdate:AccountUpdate,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<string>>  {
    await this.userService.updateAccount(accountUpdate.getAccountNumber(), accountUpdate.getBank(), user.user_id);
    this.logger.log("계좌 정보 업데이트 완료");
    return SuccessResponseDto.of();
  }

}
