import { Comment } from '../domain/entity/Comment';
import { UserTemplate } from '../domain/entity/UserTemplate';

export interface CommentAndUserTemplate {
  comment: Comment;
  userTemplate: UserTemplate;
}
