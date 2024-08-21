

export enum UserErrorCode{
    
    INVALIDATE_IDENTIFIER=450,
    INVALIDATE_EMAIL=451,
    NOT_VERIFY_CODE=452,
    NOT_VERIFY_EMAIL=453,
    NOT_FOUND_USER=455,
    NOT_FOUND_USERCHALLENGE=456,
    NOT_FOUND_AFFILIATION=457,
    NOT_FOUND_ORGANIZATION=458

    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
  
    450: "아이디가 존재하지 않습니다.",
    451: "이메일이 중복됩니다.",
    452: "인증 코드가 옳바르지 않습니다.",
    453: "이메일이 옳바르지 않습니다.",
    454: "아이디가 옳바르지 않습니다.",
    455: "유저가 존재하지 않습니다",
    456: "유저 챌린지가 존재하지 않습니다.",
    457: "소속 정보가 존재하지 않습니다.",
    458: "조직정보가 존재하지 않습니다."

};

export function errorMessage(code: UserErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}