

export interface CacheManager{
    setValue(key: string, value: string | string[], ttl: number): Promise<void>;
    getValue(key: string): Promise<string | string[] | undefined>;
    deleteValue(key: string): Promise<void>;
}
