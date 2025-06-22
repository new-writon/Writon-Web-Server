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
import { HealthController } from './global/health/HealthController';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricsModule } from './global/monitor/metrics.module';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ChallengeScheduler } from './global/util/schedule';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.url'),
        dbName: configService.get<string>('mongo.db_name'),
      }),
    }),
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
      defaultLabels: {
        app: 'nestjs-app',
      },
      path: '/metrics',
    }),
    MetricsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    TerminusModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule.forFeature(dataSource)],
    //   inject: [ConfigService],
    //   useFactory(config: ConfigService) {
    //     return config.getOrThrow('data-source');
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dataSource)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.getOrThrow('data-source'),
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        addTransactionalDataSource(dataSource); // ✅ 트랜잭션 컨텍스트 등록
        return dataSource;
      },
    }),
    CacheModule.registerAsync({ isGlobal: true, useClass: RedisConfig }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mailer.host'),
          port: configService.get<number>('mailer.port'),
          auth: {
            user: configService.get<string>('mailer.user'),
            pass: configService.get<string>('mailer.password'),
          },
        },
      }),
    }),
    UserModule,
    AuthModule,
    SmallTalkModule,
    ErrorModule,
    SatisfactionModule,
    ChallengeModule,
    TemplateModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthController],
  providers: [ChallengeScheduler],
})
export class AppModule {}
