import { SelectComment } from './SelectComment.interface';

export interface CommentWithReplies extends SelectComment {
  reply: CommentWithReplies[];
}
