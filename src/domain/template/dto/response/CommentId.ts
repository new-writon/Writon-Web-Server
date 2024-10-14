export class CommentId {
  private commentId: number;

  constructor(commentId: number) {
    this.setCommentId(commentId);
  }

  public static of(commentId: number) {
    return new CommentId(commentId);
  }

  private setCommentId(commentId: number) {
    this.commentId = commentId;
  }
}
