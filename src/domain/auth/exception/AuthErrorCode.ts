

export enum AuthErrorCode  {
    
    IDENTIFIER_IS_INCOREECT=400,
    PASSWORD_IS_INCOREECT=401,
    VERIFY_CODE_FAIL=402
    
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    400: "아이디가 옳바르지 않습니다.",
    401: "비밀번호가 옳바르지 않습니다.",
    402: "검증 코드 인증 실패"
};

export function errorMessage(code: AuthErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}