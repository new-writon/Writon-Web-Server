import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorLog } from './domain/entity/ErrorLog.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([ErrorLog]),

  
  ],
  providers: [
   
  ],
  controllers: [],
})
export class ErrorModule {}
