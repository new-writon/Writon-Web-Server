import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER, Cache  } from "@nestjs/cache-manager";
import {CacheManager} from './CacheManager'

@Injectable()
export class CacheImpl implements CacheManager {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    public async setValue(key: string, value: string | string[], ttl: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    public async getValue(key: string): Promise<string | string[] | undefined> {
        return this.cacheManager.get(key);
    }

    public async deleteValue(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }
}