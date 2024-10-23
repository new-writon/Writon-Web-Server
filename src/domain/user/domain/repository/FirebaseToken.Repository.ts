import { Repository } from 'typeorm';
import { FirebaseToken } from '../entity/FirebaseToken';

export interface FirebaseTokenRepository extends Repository<FirebaseToken> {
  findFirebaseTokenByUserIdAndEngineValue(
    userId: number,
    engineValue: string,
  ): Promise<FirebaseToken>;
  insertFirebaseToken(userId: number, engineValue: string): Promise<void>;
  deleteFirebaseToken(userId: number, engineValue: string): Promise<void>;
  findFirebaseTokenWithUserChallengeId(
    userChallengeId: number,
  ): Promise<FirebaseToken[]>;
}
