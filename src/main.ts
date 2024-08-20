import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import type { ConfigObject } from './global/config/configuration';
import { HttpExceptionFilter } from './global/exception/HttpExceptionFilter';
import { JwtService } from '@nestjs/jwt';
import { TokenInterceptor } from './domain/auth/interceptors/Token.Interceptor';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization'], // * 사용할 헤더 추가.
  });
  const config = app.get<ConfigService<ConfigObject, true>>(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe(config.get('validation')));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(config.get('port'));
}
void bootstrap();
