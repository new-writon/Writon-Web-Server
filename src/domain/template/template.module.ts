import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './domain/entity/Comment.js';
import { Likes } from './domain/entity/Likes.js';
import { QuestionContent } from './domain/entity/QuestionContent.js';
import { UserTemplete } from './domain/entity/UserTemplete.js';




@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Likes, QuestionContent, UserTemplete]),

  
  ],
  providers: [
 
  ],
  controllers: [],
})
export class TemplateModule {}
