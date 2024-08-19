

export enum TemplateErrorCode  {
    
    NOT_FOUND_USERTEMPLATE=700,
    NOT_FOUND_COMMENT=701,
    NO_COUNT_COMMENT=702
    
}


const ErrorMessages: { [key: number]: string } = {
    700:"유저 템플릿이 존재하지 않습니다.",
    701:"해당 댓글이 존재하지 않습니다.",
    702:"댓글이 존재하지 않습니다."

};

export function errorMessage(code: TemplateErrorCode): string {
    return ErrorMessages[code] || "알 수 없는 오류가 발생하였습니다.";
}