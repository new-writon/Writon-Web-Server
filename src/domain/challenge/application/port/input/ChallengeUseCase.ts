import { ChallengeOperation } from '../../service/types/Operation';

export interface ChallengeUseCase<Request, Response> {
  handle(request: Request): Response;
  operation: ChallengeOperation;
}
