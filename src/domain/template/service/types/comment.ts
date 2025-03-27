export type TemplateOperation = CommentOperation;

type CommentOperation =
  | 'INSERT_COMMENT'
  | 'DELETE_COMMENT'
  | 'UPDATE_COMMENT'
  | 'CHECK_COMMENT'
  | 'SELECT_TEMPLATE_COMMENT'
  | 'SELECT_MY_COMMENT';
