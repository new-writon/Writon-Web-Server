import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';


@Injectable()
export class RedisConfig implements CacheOptionsFactory{
    
    createCacheOptions(): CacheModuleOptions {
        const config: CacheModuleOptions = {
          store: redisStore,
          host: process.env.AWS_REDIS_ENDPOINT,
          port: process.env.AWS_REDIS_PORT,
          ttl: 60,
        };
        return config;
      }

    
}