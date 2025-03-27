import { Injectable } from '@nestjs/common';
import { TemplateHandler } from './TemplateHandler';
import { LikeCount } from '../../dto/response/LikeCount';
import { TemplateOperation } from '../types/Operation';
import { LikeHelper } from '../../helper/Like.Helper';

@Injectable()
export class LikeCountCollector implements TemplateHandler<[number], Promise<LikeCount>> {
  operation: TemplateOperation = 'SELECT_LIKE_COUNT';

  constructor(private readonly likeHelper: LikeHelper) {}
  async handle(request: [number]): Promise<LikeCount> {
    const [userTemplateId] = request;
    const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
    return LikeCount.of(likeCount);
  }
}
