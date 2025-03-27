export type TemplateOperation = CommentOperation | LikeOperation;

type CommentOperation =
  | 'INSERT_COMMENT'
  | 'DELETE_COMMENT'
  | 'UPDATE_COMMENT'
  | 'CHECK_COMMENT'
  | 'SELECT_TEMPLATE_COMMENT'
  | 'SELECT_MY_COMMENT';

type LikeOperation = 'CHECK_LIKE';
