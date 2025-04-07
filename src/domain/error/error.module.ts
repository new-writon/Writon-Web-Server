import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorLog } from './domain/entity/ErrorLog';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorLog])],
  providers: [],
  controllers: [],
})
export class ErrorModule {}
