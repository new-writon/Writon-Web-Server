import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agora } from './domain/entity/Agora.js';
import { AgoraComment } from './domain/entity/AgoraComment.js';



@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Agora, AgoraComment],
    ),

  
  ],
  providers: [
    
  ],
  controllers: [],
})
export class AgoraModule {}
