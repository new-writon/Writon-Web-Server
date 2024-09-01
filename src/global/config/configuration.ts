import { HttpStatus, type ValidationPipeOptions } from '@nestjs/common';

export type ConfigObject = ReturnType<typeof configuration>;

export function configuration() {


  return {
    port: Number.parseInt(process.env.PORT, 10) || 3000,
    jwt:{
      secret: process.env.SECRET,
      access_token:process.env.ACCESS_TOKEN,
      refresh_token:process.env.REFRESH_TOKEN
    },
    mailer:{
      host:process.env.NODEMAILER_HOST,
      port: Number(process.env.NODEMAILER_PORT),
      user:process.env.NODEMAILER_USER,
      password:process.env.NODEMAILER_PASS

    }, 
    validation: {
      transform: true,  //요청의 데이터를 자동으로 변환
      whitelist: true, //들어오는 요청의 데이터가 DTO(Data Transfer Object)에 정의되지 않은 속성을 자동으로 제거
      forbidUnknownValues: true, // DTO에 정의되지 않은 속성이 요청에 포함되어 있을 때 ValidationPipe가 해당 요청을 거부
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // 유효성 검사 실패 시 클라이언트에게 전달되는 HTTP 응답의 상태 코드를 결정합니다.
    } as ValidationPipeOptions,
  };
}
