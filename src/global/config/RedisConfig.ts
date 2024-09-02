import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import redisStore from 'cache-manager-redis-store';


@Injectable()
export class RedisConfig implements CacheOptionsFactory{

  constructor(
    private readonly configService: ConfigService,
  ){}
    
    createCacheOptions(): CacheModuleOptions {
        const config: CacheModuleOptions = {
          store: redisStore,
          host: this.configService.get<string>('redis.host'),
          port: this.configService.get<string>('redis.port'),
        };
        return config;
      }
}