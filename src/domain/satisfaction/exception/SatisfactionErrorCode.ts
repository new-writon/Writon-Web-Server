

export enum SatisfactionErrorCode  {
    
    NOT_FOUND_SATISFACTION_QUESTION=900
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    900: "해당 챌린지의 만족도 질문 정보가 없습니다."

};

export function errorMessage(code: SatisfactionErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}