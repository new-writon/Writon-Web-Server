export interface CommentHandler<Request, Response> {
  handle(request: Request): Response;
  operation: string;
}
