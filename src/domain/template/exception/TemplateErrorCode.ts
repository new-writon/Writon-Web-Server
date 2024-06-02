

export enum TemplateErrorCode  {
    
    NOT_FOUND_USERTEMPLATE=700
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    700:"유저 챌린지가 존재하지 않습니다."

};

export function errorMessage(code: TemplateErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}