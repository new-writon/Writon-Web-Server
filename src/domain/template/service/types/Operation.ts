export type TemplateOperation = CommentOperation | LikeOperation;

type CommentOperation =
  | 'INSERT_COMMENT'
  | 'DELETE_COMMENT'
  | 'UPDATE_COMMENT'
  | 'CHECK_COMMENT'
  | 'SELECT_TEMPLATE_COMMENT'
  | 'SELECT_MY_COMMENT';

type LikeOperation =
  | 'CHECK_LIKE'
  | 'INSERT_LIKE'
  | 'PUT_LIKE'
  | 'SELECT_LIKE_COUNT'
  | 'SELECT_PRESS_USER';
