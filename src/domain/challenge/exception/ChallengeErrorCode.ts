

export enum ChallengeErrorCode  {
    
    NOT_FOUND_CHALLENGE_DAY=600
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    501: "강제 에러 발생",
    502: "해당 값이 존재하지 않습니다.",
    600: "오늘은 챌린지를 진행하는 날짜가 아닙니다."

};

export function errorMessage(code: ChallengeErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}