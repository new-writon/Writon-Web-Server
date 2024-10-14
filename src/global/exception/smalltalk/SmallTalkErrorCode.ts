export enum SmallTalkErrorCode {
  NOT_FOUND_PARTICULAR_SMALL_TALK = 600,
  CANT_ADD_SMALL_TALK = 601,
  NOT_FOUND_PARTICULAR_SMALL_TALK_COMMENT = 602,
  NOT_FOUND_SMALL_TALK = 603,
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
  600: '특정 스몰톡 데이터가 존재하지 않습니다.',
  601: '스몰톡를 더 이상 추가할 수 없어요.',
  602: '특정 스몰톡 댓글 데이터가 존재하지 않습니다.',
};

export function errorMessage(code: SmallTalkErrorCode): string {
  return ErrorMessages[code] || '알 수 없는 오류가 발생하였습니다.';
}
