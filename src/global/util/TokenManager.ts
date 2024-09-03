import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER, Cache  } from "@nestjs/cache-manager";


export interface TokenManager {
    set(key: string, value: string | string[], ttl: number): Promise<void>;
    get(key: string): Promise<string | string[] | undefined>;
    delete(key: string): Promise<void>;
}




