

export enum AuthErrorCode  {
    
    IDENTIFIER_IS_INCOREECT=400,
    PASSWORD_IS_INCOREECT=401,
    VERIFY_CODE_FAIL=402,
    LOGIN_AGAIN=403,
    NOT_EXPIRED=404,
    INVALIDATE_IDENTIFIER=405,
    INVALIDATE_EMAIL=406,
    NOT_VERIFY_CODE=407,
    NOT_VERIFY_EMAIL=408,
    
    
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    400: "아이디가 옳바르지 않습니다.",
    401: "비밀번호가 옳바르지 않습니다.",
    402: "검증 코드 인증 실패",
    403: "재로그인 하세요",
    404: "토큰이 만료되지 않았습니다.",
    405: "아이디가 중복됩니다.",
    406: "이메일이 중복됩니다.",
    407: "인증 코드가 옳바르지 않습니다.",
    408: "이메일이 옳바르지 않습니다.",

};

export function errorMessage(code: AuthErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}