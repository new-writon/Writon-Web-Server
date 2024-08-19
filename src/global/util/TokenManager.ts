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

    public async getToken(key:string): Promise<string>{   
        return this.cacheManager.get(key);
    }


    public async deleteToken(key:string){
        await this.cacheManager.del(key);
    }

    public async setTimeoutToken(key: string, value: string, time: number){
        await this.cacheManager.set(key, value, time)
    }


}