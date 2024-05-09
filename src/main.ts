import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module.js';
import type { ConfigObject } from './global/config/configuration.js';
import { HttpExceptionFilter } from './global/exception/HttpExceptionFilter.js';
import { JwtService } from '@nestjs/jwt';
import { TokenInterceptor } from './domain/auth/interceptors/Token.Interceptor.js';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ConfigObject, true>>(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe(config.get('validation')));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const jwtService = app.get(JwtService);
  const tokenInterceptor = new TokenInterceptor(jwtService);

  //console.log(tokenInterceptor.generateToken(1, "USER"))
  await app.listen(config.get('port'));
}


void bootstrap();
