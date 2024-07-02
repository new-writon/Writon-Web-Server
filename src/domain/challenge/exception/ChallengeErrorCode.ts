

export enum ChallengeErrorCode  {
    
    NOT_FOUND_CHALLENGE_DAY=800,
    NOT_FOUND_CHALLENGE=801
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    800: "오늘은 챌린지를 진행하는 날짜가 아닙니다.",
    801: "챌린지 데이터가 존재하지 않습니다."

};

export function errorMessage(code: ChallengeErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}