import { Body, Controller, Get, HttpCode, Patch, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {  UserService } from '../service/User.Service.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { TestRequestDto } from '../dto/TestRequest.dto.js';
import { JWTAuthGuard } from '../../auth/guards/JwtAuth.Guard.js';
import { CurrentUserInterceptor } from '../../auth/interceptors/CurrentUser.Interceptor.js';
import { User } from '../domain/entity/User.js';
import { CurrentUser } from '../../auth/decorators/Auth.Decorator.js';
import { UserIdentifier } from '../dto/response/UserIdentifier.js';
import { TemporaryPassword } from '../dto/request/TemporaryPassword.js';
import { PasswordChange } from '../dto/request/PasswordChange.js';

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
  

  @Get("/idenfitier/find")
  @HttpCode(200)
  public async findIdentifier(
    @Query("email") email: string,
    @Query("code") code: string
  ): Promise<SuccessResponseDto<UserIdentifier>>  {

    const result : UserIdentifier = await this.userService.findIdentifier(email, code);
    return SuccessResponseDto.of(result);
  }


  @Patch("/temporary-password/generate")
  @HttpCode(200)
  public async generateTemporaryPassword(
    @Body() temporaryPassword: TemporaryPassword
  ): Promise<SuccessResponseDto<void>>  {

    await this.userService.generateTemporaryPassword(temporaryPassword.getIdentifier(), temporaryPassword.getEmail());
    return SuccessResponseDto.of();
  }



  @Patch("/password/change")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  public async changePassword(
    @Body() passwordChange: PasswordChange,
    @CurrentUser() user: User
  ): Promise<SuccessResponseDto<void>>  {


    await this.userService.changePassword(user.getUserId(), passwordChange.getOldPassword(), passwordChange.getNewPassword());
    return SuccessResponseDto.of();
  }

}
