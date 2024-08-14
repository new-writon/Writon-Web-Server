

export enum SmallTalkErrorCode  {
    
    NOT_FOUND_PARTICULAR_AGORA = 600,
    CANT_ADD_AGORA=601,
    NOT_FOUND_PARTICULAR_AGORA_COMMENT = 602,
    UNAUTHORIZED = 1001,
    
}

// 각 에러 코드에 대한 메시지 정의
const ErrorMessages: { [key: number]: string } = {
    600: "특정 아고라 데이터가 존재하지 않습니다.",
    601: "아고라를 더 이상 추가할 수 없어요.",
    602: "특정 아고라 댓글 데이터가 존재하지 않습니다."
};

export function errorMessage(code: SmallTalkErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}