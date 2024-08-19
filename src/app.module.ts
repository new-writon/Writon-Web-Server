import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './global/config/configuration';
import { dataSource } from './global/config/database';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { SmallTalkModule } from './domain/smalltalk/smalltalk.module';
import { ErrorModule } from './domain/error/error.module';
import { SatisfactionModule } from './domain/satisfaction/satisfaction.module';
import { ChallengeModule } from './domain/challenge/challenge.module';
import { TemplateModule } from './domain/template/template.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisConfig } from './global/config/RedisConfig';
import { MailerModule } from '@nestjs-modules/mailer';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    TerminusModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dataSource)],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return config.getOrThrow('data-source');
      },     
    }),
    CacheModule.registerAsync({ isGlobal: true, useClass: RedisConfig }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      },
      // defaults: {
      //   from: '"nest-modules" <modules@nestjs.com>',
      // },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    UserModule,
    AuthModule,
    SmallTalkModule,
    ErrorModule,
    SatisfactionModule,
    ChallengeModule,
    TemplateModule,
 

  
    

  ],
  controllers: [],
 
})
export class AppModule { }
