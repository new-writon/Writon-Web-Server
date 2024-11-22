import { Repository } from 'typeorm';
import { AuthToken } from '../entity/AuthToken';

export interface AuthTokenRepository extends Repository<AuthToken> {
  deleteAuthToken(userId: number, token: string): Promise<void>;
}
