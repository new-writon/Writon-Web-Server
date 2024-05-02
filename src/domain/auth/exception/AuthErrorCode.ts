

export enum AuthErrorCode  {
    
    IDENTIFIER_IS_INCOREECT=400,
    PASSWORD_IS_INCOREECT=401
    
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    400: "아이디가 옳바르지 않습니다.",
    401: "비밀번호가 옳바르지 않습니다."
};

export function errorMessage(code: AuthErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}