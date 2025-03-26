import { CommentOperation } from '../types/comment';

export interface CommentHandler<Request, Response> {
  handle(request: Request): Response;
  operation: CommentOperation;
}
