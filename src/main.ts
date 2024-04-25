import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module.js';
import type { ConfigObject } from './global/config/configuration.js';
import { HttpExceptionFilter } from './global/exception/HttpExceptionFilter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ConfigObject, true>>(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(new ValidationPipe(config.get('validation')));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(config.get('port'));
}



void bootstrap();
