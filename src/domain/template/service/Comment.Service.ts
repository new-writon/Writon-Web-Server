import { CommentHelper } from '../helper/Comment.Helper';
import { UserApi } from '../infrastructure/User.Api';
import { DataMapperService } from '../domain/service/DataMappper.Service';
import { MyComment } from '../dto/response/MyComment';
import { CommentId } from '../dto/response/CommentId';
import { Comment } from '../domain/entity/Comment';
import { Affiliation } from '../../../domain/user/domain/entity/Affiliation';
import { CommentInformation } from '../dto/response/CommentInformation';
import { sortCompanyPublic } from '../util/data';
import { formatDate, formatDateToPushAlarmStatus } from '../util/date';
import { checkData, compareValues } from '../util/checker';
import { CommentInsert } from '../dto/request/CommentInsert';
import { AlarmService } from '../../../global/alarm/Alarm.Service';
import { UserTemplateHelper } from '../helper/UserTemplate.Helper';
import { UserChallenge } from '../../../domain/user/domain/entity/UserChallenge';
import { ChallengeApi } from '../infrastructure/Challenge.Api';
import { Challenge } from '../../../domain/challenge/domain/entity/Challenge';
import { UserTemplate } from '../domain/entity/UserTemplate';
import { checkFirebaseToken } from '../util/checker';
import { CommentHandler } from './handler/CommentHandler';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommentOperation } from './types/comment';

@Injectable()
export class CommentService {
  private handleMap = new Map<string, CommentHandler<any, any>>();
  constructor(@Inject('COMMENT_HANDLERS') handlers: CommentHandler<any, any>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  private registerHandler(handler: CommentHandler<any, any>) {
    this.handleMap.set(handler.operation, handler);
  }

  async execute<Request extends unknown[] | unknown, Response>(
    operation: CommentOperation,
    ...request: Request extends unknown[] ? Request : [Request]
  ): Promise<Response> {
    const handler = this.handleMap.get(operation);
    if (!handler) throw Error('Handler Empty Error');
    return handler.handle(request) as Response;
  }
}
