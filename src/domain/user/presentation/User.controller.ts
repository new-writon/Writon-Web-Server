import { Body, Controller, Get, HttpCode, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {  UserService } from '../service/User.Service.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { TestRequestDto } from '../dto/TestRequest.dto.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { CurrentUserInterceptor } from '../../auth/interceptors/CurrentUser.Interceptor.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';

@Controller("/api/user")
export class UserController {
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
    const result :string = await this.userService.test(user.userId);
    return SuccessResponseDto.of(result);
  }

  @Get("/identifier/check")
  @HttpCode(200)
  public async checkDuplicateIdentifier(
    @Query("identifier") identifier: string
  ): Promise<SuccessResponseDto<void>>  {

    await this.userService.checkDuplicateIdentifier(identifier);
    return SuccessResponseDto.of();
  }



  @Get("/email/check")
  @HttpCode(200)
  public async checkDuplicateEmail(
    @Query("email") email: string
  ): Promise<SuccessResponseDto<void>>  {

    await this.userService.checkDuplicateEmail(email);
    return SuccessResponseDto.of();
  }
}
