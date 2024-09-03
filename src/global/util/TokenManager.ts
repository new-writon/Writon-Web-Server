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


    public async deleteToken(key:string, value?:string){
        switch(true){
            case value === undefined || value === null:
                await this.cacheManager.del(key);
                break;
            
            default :
                const datas = await this.getToken(key) as string[];
                const remainderDatas = datas.filter(data => data !== value)
                await this.setToken(key, remainderDatas, 0);

        }
    }



    private async setDataAccordingToType(key:string, value:string | string[], time:number){
        switch(true){
            case (typeof value == 'string'):
                const data = await this.getToken(key) as string[];
                data.push(value);
                break;
        
            case (Array.isArray(value) && value.every(item => typeof item === 'string')):
                await this.cacheManager.set(key, value, time);
                console.log(await this.getToken(key))
                break;

            default :
                throw Error("타입 에러");
        }
    }


}