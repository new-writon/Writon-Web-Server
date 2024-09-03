import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER, Cache  } from "@nestjs/cache-manager";

@Injectable()
export class TokenManager {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    public async setToken(key:string, value:string | string[], time:number){
        this.setDataAccordingToType(key, value, time);
    }

    public async getToken(key:string): Promise<string | string[]>{   
        return this.cacheManager.get(key);
    }


    public async deleteToken(key:string){
        await this.cacheManager.del(key);
    }

    public async setDataAccordingToType(key:string, value:string | string[], time:number){
        switch(true){
            case (typeof value == 'string'):
                const data = await this.getToken(key) as string[];
                data.push(value);
        
            case (Array.isArray(value) && value.every(item => typeof item === 'string')):
                await this.cacheManager.set(key, value, time);
                console.log(await this.getToken(key))

            default :
                throw Error("타입 에러");
        }
    }


}