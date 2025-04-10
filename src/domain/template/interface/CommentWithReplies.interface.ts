interface CommentWithReplies extends SelectComment {
  reply: CommentWithReplies[];
}
