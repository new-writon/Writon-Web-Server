

export enum UserErrorCode{
    
    ERROR = 501,
    NO_VALUE=502,
    INVALIDATE_IDENTIFIER=450,
    INVALIDATE_EMAIL=451,
    NOT_VERIFY_CODE=452,
    NOT_VERIFY_EMAIL=453

    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    501: "강제 에러 발생",
    502: "해당 값이 존재하지 않습니다.",
    450: "아이디가 중복됩니다.",
    451: "이메일이 중복됩니다.",
    452: "인증 코드가 옳바르지 않습니다.",
    453: "이메일이 옳바르지 않습니다."

};

export function errorMessage(code: UserErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}