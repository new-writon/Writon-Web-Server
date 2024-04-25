import { Body, Controller, Get, HttpCode, Req, UseFilters } from '@nestjs/common';
import {  UserService } from '../domain/service/User.service.js';
import { SuccessResponseDto } from '../../../global/response/SuccessResponseDto.js';
import { TestRequestDto } from '../dto/TestRequest.dto.js';

@Controller("/api/test")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  public async getHello(
    @Body() testReqeustDto :TestRequestDto,
    @Req() req:Request
  ): Promise<SuccessResponseDto<string>>  {
    
    // const userId : number = req.decoded.id;
    // console.log(userId)
    // console.log(2)

    const result :string = await this.userService.test(
      testReqeustDto
      );


   return SuccessResponseDto.of(result);
  }
}
