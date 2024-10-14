export enum TemplateErrorCode {
  NOT_FOUND_USERTEMPLATE = 700,
  NOT_FOUND_COMMENT = 701,
  NO_COUNT_COMMENT = 702,
  NOT_FOUND_LIKE = 703,
  NOT_FOUND_TEMPLATE_CONTENT = 704,
  ALREADY_EXIST_LIKE = 705,
  ALREADY_EXIST_USERTEMPLATE = 706,
  NOT_FOUND_QUESTION = 707,
}

const ErrorMessages: { [key: number]: string } = {
  700: '유저 템플릿이 존재하지 않습니다.',
  701: '해당 댓글이 존재하지 않습니다.',
  702: '댓글이 존재하지 않습니다.',
  703: '좋아요가 존재하지 않습니다',
  704: '템플릿 내용 데이터가 존재하지 않습니다.',
  705: '좋아요가 이미 존재합니다.',
  706: '이미 템플릿을 작성하셨습니다.',
  707: '질문 데이터가 존재하지 않습니다.',
};

export function errorMessage(code: TemplateErrorCode): string {
  return ErrorMessages[code] || '알 수 없는 오류가 발생하였습니다.';
}
