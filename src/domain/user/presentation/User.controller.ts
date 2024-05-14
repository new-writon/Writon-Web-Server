import { Body, Controller, Get, HttpCode, Patch, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {  UserService } from '../service/User.Service.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { TestRequestDto } from '../dto/TestRequest.dto.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { CurrentUserInterceptor } from '../../auth/interceptors/CurrentUser.Interceptor.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { UserIdentifier } from '../../auth/dto/response/UserIdentifier.js';
import { TemporaryPassword } from '../../auth/dto/request/TemporaryPassword.js';
import { PasswordChange } from '../../auth/dto/request/PasswordChange.js';

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
    const result :string = await this.userService.test(user.user_id);
    return SuccessResponseDto.of(result);
  }

  

}
