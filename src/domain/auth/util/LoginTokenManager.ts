import { Injectable } from '@nestjs/common';
import { CacheImpl } from '../../../global/util/CacheImpl';

@Injectable()
export class LoginTokenManager {
  constructor(private readonly cacheImpl: CacheImpl) {}

  public async setToken(
    key: string,
    value: string | string[],
    ttl: number,
  ): Promise<void> {
    const existingValue = await this.cacheImpl.getValue(key);
    if (Array.isArray(value)) {
      value = this.mergeValues(existingValue, value);
    }
    await this.cacheImpl.setValue(key, value, ttl);
  }

  public async getToken(key: string): Promise<string | string[] | undefined> {
    return this.cacheImpl.getValue(key);
  }

  public async deleteToken(key: string, value?: string): Promise<void> {
    if (!value) {
      await this.cacheImpl.deleteValue(key);
    } else {
      const existingValue = (await this.getToken(key)) as string[];
      const updatedValue = existingValue?.filter((data) => data !== value);
      await this.cacheImpl.setValue(key, updatedValue, 0);
    }
  }

  private mergeValues(
    existingValue: string | string[] | undefined,
    newValue: string[],
  ): string[] {
    if (existingValue === undefined || existingValue === null) {
      return newValue;
    }
    if (Array.isArray(existingValue)) {
      return [...existingValue, ...newValue];
    }
    return [existingValue, ...newValue];
  }
}
