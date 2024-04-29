import { Inject, Injectable } from "@nestjs/common";

import { CACHE_MANAGER, Cache  } from "@nestjs/cache-manager";

@Injectable()
export class TokenManager {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    public async setToken(key:string, value:string){
        
        await this.cacheManager.set(key, value);
    }
}