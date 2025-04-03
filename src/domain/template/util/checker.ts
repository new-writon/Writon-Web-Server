import { UserChallenge } from 'src/domain/user/domain/entity/UserChallenge';

/**
 *
 * @param data
 * @returns  데이터가 없을 경우 false 반환, 있을 경우 true 반환
 */
export const checkData = (data: any): boolean => {
  let result = true;
  if (data === undefined || data === null) {
    // 데이터가 없을 경우
    return (result = false);
  }
  return result;
};

export const compareValues = (first: number, second: number) => {
  if (first === second) return 'my';
  return 'others';
};

export const checkFirebaseToken = (userChallengeData: UserChallenge): boolean => {
  if (userChallengeData.getAffiliation().getUser().getFirebaseTokens().length > 0) {
    return true;
  }
  return false;
};
